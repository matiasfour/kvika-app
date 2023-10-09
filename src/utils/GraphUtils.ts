import { line, scaleBand, scaleLinear } from 'd3';
import { Skia, SkPath } from '@shopify/react-native-skia';
import { SharedValue } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { getFormattedNumber } from '@kvika/string-utils';
import { InstrumentPrice, PriceSeriesSchema } from '@kvika/api-types';
import {
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  GRAPH_X_OFFSET,
  GRAPH_Y_INTERVALS,
  MONTH_CEIL,
  SIX_MONTH_CEIL,
  WEEK_CEIL,
  YEAR_CEIL,
  Y_INTERVAL_COUNT,
  Y_INTERVAL_COUNT_FROM_CENTER,
} from '../constants/GraphConstants';
import { getFormattedDayOfWeek, getShortDayAndMonth, getShortMonthName, getYearFromTimestamp } from './TimeUtils';

type GraphType = 'marketValue' | 'historicalReturn' | 'instrument';

export type InstrumentPricePoint = InstrumentPrice & { graphType: Extract<GraphType, 'instrument'> };
export type PriceSeriesPoint = PriceSeriesSchema & {
  graphType: Extract<GraphType, 'marketValue' | 'historicalReturn'>;
};

export type DataPoint = InstrumentPricePoint | PriceSeriesPoint;

export type XIntervalData = { index: number; displayValue: string; timestamp: string };
export type XIntervalDisplayData = Pick<XIntervalData, 'index' | 'displayValue'>;

export type GraphState = {
  current: number;
  next: number;
};

type YValueType = 'amount' | 'percentage';

type BaseGraphData = {
  data: Array<DataPoint>;
  lineGraph: SkPath;
  yIntervalValues: Array<string>;
  xIntervalData: Array<XIntervalDisplayData>;
  rangeOffset: number;
  graphLineSVGString: string | null;
};

export type MarketValueGraphData = BaseGraphData & {
  firstValueLine: SkPath;
  gradientArea: SkPath;
};

export type HistoricalReturnGraphData = BaseGraphData & {
  gradientAreaSplit: SkPath;
};

export type InstrumentGraphData = BaseGraphData & {
  firstValueLine: SkPath;
  gradientArea: SkPath;
};

export const getYRange = (min: number, max: number, yValueType: YValueType) => {
  if (yValueType === 'percentage') {
    // If y is a percentage (e.g. historical return graph) then we have y=0 in the center,
    // so we need to calculate the range from there.
    return Math.max(Math.abs(min), Math.abs(max));
  }
  return max - min;
};

export const getMinYDomain = (min: number, max: number, yInterval: number, yValueType: YValueType) => {
  if (yValueType === 'percentage') {
    // The historical return graph has y=0 in the center, so the min domain is -max
    const absMax = Math.max(Math.abs(min), Math.abs(max));
    return -(Math.ceil(absMax / yInterval) * yInterval);
  }
  return Math.floor(min / yInterval) * yInterval;
};

export const getMaxYDomain = (minYDomain: number, yInterval: number, yValueType: YValueType) => {
  if (yValueType === 'percentage') {
    // The historical return graph has y=0 in the center, so the max domain is -min
    return Math.abs(minYDomain);
  }
  return minYDomain + yInterval * Y_INTERVAL_COUNT;
};

export const getIntervalsFromBaseCount = (yValueType: YValueType) => {
  // The market value graph has y=0 at the bottom and thus 4 intervals from bottom to top,
  // while the the historical return graph has y=0 in the center and thus 2 intervals from center to top (and from center to bottom).
  return yValueType === 'percentage' ? Y_INTERVAL_COUNT_FROM_CENTER : Y_INTERVAL_COUNT;
};

/**
 * Gets the offset that should be added to the interval if the range is too small for a large y-value. This is used in order to avoid
 * intervals that are so small that each y-value is rounded to the same value.
 * @param range
 * @param maxValue
 * @returns a number that will offset the rounding of the range if the range is too small
 */
const getSmallRangeOffset = (range: number, maxValue: number) => {
  if (maxValue >= 1_000_000 && range < 100) {
    // Anything above 1 million will cut of the last 2 digits so that rounding needs to be offset
    // if the range is too small
    return 100;
  }
  if (maxValue >= 1_000 && range < 1) {
    // Anything above 1 thousand will cut of the last 2 digits so that rounding needs to be offset
    // if the range is too small
    return 1;
  }

  return 0;
};

/**
 * Gets a sensible y interval for the given range. For example, if the max y-value is 33 m.kr.,
 * then we want the y-intervals to be 10 m.kr. so we see the labels 0 kr., 10 m.kr., 20 m.kr., 30 m.kr., 40 m.kr.
 * @param min
 * @param max
 */
export const getYInterval = (min: number, max: number, yValueType: YValueType): number => {
  // Diff of max and min y-value
  const range = getYRange(min, max, yValueType);
  // 4 intervals for all graphs except historical return graph, which has 2 intervals from center to top and center to bottom
  const intervalsFromBase = getIntervalsFromBaseCount(yValueType);
  // The "default" interval (e.g. 99 / 4 = 24.75, would be rounded to 25)
  const baseInterval = range / intervalsFromBase;
  // The value closest to the "base" of the graph is always the min value except for the historical return graph,
  // which has the base (y=0) in the center - i.e. the value closest to the base is always 0 there as we should always get 0 for the first value.
  const valueClosestToBase = yValueType === 'percentage' ? 0 : min;

  const roundingOffset = getSmallRangeOffset(range, max);

  const roundingNumber = getRoundToNumber(range);

  return getAdjustedInterval(baseInterval, intervalsFromBase, valueClosestToBase, roundingNumber, roundingOffset);
};

export const getRoundToNumber = (range: number) => {
  const index = GRAPH_Y_INTERVALS.findIndex((space) => space <= range);
  if (index === -1) {
    return 0.000025;
  }
  const space = GRAPH_Y_INTERVALS[index];
  // We have a special case for the 100m+ range, where want to round to 10m instead of 50m
  if (space === 100_000_000) {
    return space / 10;
  }
  return space / 2;
};

/**
 * Let's say the range is 90. If the the lowest value is 0, we can have 4 intervals from 0 to 100 (0-25, 25-50, 50-75, 75-100).
 * But if the lowest value is 15, then highest value is 105 which doesn't fit the above intervals,
 * so we then need a larger interval to get 0-50, 50-100, 100-150, 150-200.
 * This function gets this "adjusted" interval.
 *
 * A rounding offset°
 */
export const getAdjustedInterval = (
  baseInterval: number,
  intervalsFromBase: number,
  valueClosestToBase: number,
  roundTo: number,
  roundingOffset = 0
) => {
  const defaultInterval = Math.ceil(baseInterval / roundTo) * roundTo;
  // e.g. 123 (valueClosestToBase) % 25 (defaultInterval) = 23,
  // so 23 is the distance from the default base of the graph (here 100) to the y-value closest to it (123)
  const distanceFromBase = Math.abs(valueClosestToBase % defaultInterval);
  const offset = distanceFromBase / intervalsFromBase;
  const adjustedBaseInterval = baseInterval + offset;

  return Math.ceil(adjustedBaseInterval / roundTo) * roundTo + roundingOffset;
};

export const getFormattedAmountLabel = (value: number, showCurrency = true): string => {
  const absValue = Math.abs(value);
  if (absValue >= 1_000_000) {
    return getFormattedNumber({
      value: value / 1_000_000,
      significantDigits: 4,
      symbol: showCurrency ? 'm.kr.' : 'm.',
    });
  }
  if (absValue >= 1_000) {
    return getFormattedNumber({ value: value / 1_000, significantDigits: 4, symbol: showCurrency ? 'þ.kr.' : 'þ.' });
  }
  return getFormattedNumber({ value, significantDigits: 4, showSymbol: showCurrency });
};

export const getFormattedPercentageLabel = (value: number): string => {
  return getFormattedNumber({ value: value * 100, significantDigits: 4, symbol: '%', showSymbolSpace: false });
};

export const getFormattedLabel = (yValueType: YValueType, value: number, showCurrency = true) => {
  if (yValueType === 'amount') {
    return getFormattedAmountLabel(value, showCurrency);
  }
  return getFormattedPercentageLabel(value);
};

export const isCloseToFirstOfMonth = (datum: DataPoint) => {
  const day = new Date(datum.timestamp).getDate();
  return day <= 5;
};

export const isCloseToFirstOfYear = (datum: DataPoint) => {
  const month = new Date(datum.timestamp).getMonth();
  return isCloseToFirstOfMonth(datum) && month === 0;
};

export const getFirstOfMonthData = (data: DataPoint[]): XIntervalData[] => {
  return data.reduce<XIntervalData[]>((acc, curr, index) => {
    const shortMonthName = getShortMonthName(curr.timestamp);
    const year = getYearFromTimestamp(curr.timestamp);
    // Add to list if timestamp is close to 1st of the month and it's not already in the list
    // We do the "close to" check because the Instrument data doesn't have data for every day (so it might skip the 1st).
    if (
      isCloseToFirstOfMonth(curr) &&
      !acc.some((datum) => datum.displayValue === shortMonthName && getYearFromTimestamp(datum.timestamp) === year)
    ) {
      acc.push({ displayValue: shortMonthName, index, timestamp: curr.timestamp });
    }
    return acc;
  }, []);
};

export function getEveryOtherValue<T>(data: T[]) {
  return data.filter((_d, index) => index % 2 === 0);
}

export const getFirstOfYearData = (data: DataPoint[]): XIntervalData[] => {
  return data.reduce<XIntervalData[]>((acc, curr, index) => {
    const year = getYearFromTimestamp(curr.timestamp);
    // Add to list if timestamp is close to 1st Jan of the year and it's not already in the list
    // We do the "close to" check because the Instrument data doesn't have data for every day (so it might skip the 1st).
    if (isCloseToFirstOfYear(curr) && !acc.some((datum) => datum.displayValue === year)) {
      acc.push({ displayValue: year, index, timestamp: curr.timestamp });
    }
    return acc;
  }, []);
};

export function getMax8Values<T>(data: T[]): T[] {
  if (data.length <= 8) {
    return data;
  }
  const everyOtherValue = getEveryOtherValue(data);
  return getMax8Values(everyOtherValue);
}

export const getXIntervalData = (data: DataPoint[]): XIntervalData[] => {
  // "One week" period: Show every day (written as 'Mán', 'Þri', etc.)
  if (data.length <= WEEK_CEIL) {
    return data.map((d, index) => ({
      displayValue: getFormattedDayOfWeek(new Date(d.timestamp)),
      index,
      timestamp: d.timestamp,
    }));
  }
  // "One month" period: Every 7th day (written as '7. nóv.', '14. nóv.', etc.)
  if (data.length <= MONTH_CEIL) {
    return data.reduce<XIntervalData[]>((acc, curr, index) => {
      // Every 7th day
      if (index % 7 === 0) {
        acc.push({ displayValue: getShortDayAndMonth(curr.timestamp), index, timestamp: curr.timestamp });
      }
      return acc;
    }, []);
  }
  // "Six months" period: Show every month at 1st of month (written as 'Jan', 'Feb', etc.)
  if (data.length <= SIX_MONTH_CEIL) {
    return getFirstOfMonthData(data);
  }
  // "One year" period: First and last month at closest to 1st of month, and every other month inbetween
  if (data.length <= YEAR_CEIL) {
    const firstOfMonthData = getFirstOfMonthData(data);
    // Only return the display value for every other month (we still want the vertical markers for every month)
    return firstOfMonthData.map((datum, index) => (index % 2 === 0 ? datum : { ...datum, displayValue: '' }));
  }
  // Longer periods (e.g. "Five years"): A vertical marker for every year but a maximum of 8 display values (evenly distributed)
  const firstOfYearData = getFirstOfYearData(data);
  const max8Values = getMax8Values(firstOfYearData);
  return firstOfYearData.map((datum) => {
    const hasDisplayValue = max8Values.some((max8Value) => max8Value.displayValue === datum.displayValue);
    return hasDisplayValue ? datum : { ...datum, displayValue: '' };
  });
};

export const getYIntervalValues = (min: number, max: number, yValueType: YValueType, showCurrency = true): string[] => {
  const yInterval = getYInterval(min, max, yValueType);
  const minYDomain = getMinYDomain(min, max, yInterval, yValueType);

  const intervals = [
    minYDomain + yInterval * 4,
    minYDomain + yInterval * 3,
    minYDomain + yInterval * 2,
    minYDomain + yInterval,
    minYDomain,
  ];

  return intervals.map((interval) => getFormattedLabel(yValueType, interval, showCurrency));
};

export const getLineGraph = (graphLineSVGString: string | null) => {
  return Skia.Path.MakeFromSVGString(graphLineSVGString ?? '0') ?? Skia.Path.Make();
};

export const getFirstValueLine = (y: number) => {
  return Skia.Path.Make().moveTo(0, y).lineTo(GRAPH_WIDTH, y);
};

export const getGradientArea = (graphLineSVGString: string | null) => {
  const gradientAreaPath = Skia.Path.MakeFromSVGString(graphLineSVGString ?? '0') ?? Skia.Path.Make();
  gradientAreaPath.lineTo(GRAPH_WIDTH, GRAPH_HEIGHT).lineTo(0, GRAPH_HEIGHT).close();
  return gradientAreaPath;
};

export const getYAxisValue = (datum: DataPoint): number => {
  return datum.graphType === 'marketValue' ? datum.marketValue : datum.price;
};

export const getGradientAreaSplit = (graphLineSVGString: string | null) => {
  const gradientAreaSplit = Skia.Path.MakeFromSVGString(graphLineSVGString ?? '0') ?? Skia.Path.Make();
  gradientAreaSplit
    .lineTo(GRAPH_WIDTH, GRAPH_HEIGHT / 2)
    .lineTo(0, GRAPH_HEIGHT / 2)
    .close();
  return gradientAreaSplit;
};

export const getBaseGraphData = (data: DataPoint[], min: number, max: number): BaseGraphData => {
  const sortedData = data.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
  const yValueType: YValueType =
    sortedData.length > 0 && sortedData[0].graphType === 'historicalReturn' ? 'percentage' : 'amount';
  // If min and max are the same, add 1 to make sure there's at least some range in the graph
  const normalizedMax = min === max ? max + 1 : max;
  const yInterval = getYInterval(min, normalizedMax, yValueType);
  const minYDomain = getMinYDomain(min, normalizedMax, yInterval, yValueType);
  const maxYDomain = getMaxYDomain(minYDomain, yInterval, yValueType);

  const y = scaleLinear().domain([minYDomain, maxYDomain]).range([GRAPH_HEIGHT, 0]);

  const x = scaleBand<Date>()
    .domain(sortedData.map((d) => new Date(d.timestamp)))
    .range([0, GRAPH_WIDTH])
    .paddingInner(1);

  const graphLineSVGString = line<DataPoint>()
    .x((d) => x(new Date(d.timestamp)) ?? 0)
    .y((d) => y(getYAxisValue(d)))(sortedData);

  const lineGraph = getLineGraph(graphLineSVGString);

  return {
    data: sortedData,
    lineGraph,
    yIntervalValues: getYIntervalValues(min, normalizedMax, yValueType, sortedData[0].graphType !== 'instrument'),
    xIntervalData: getXIntervalData(sortedData),
    rangeOffset: 0,
    graphLineSVGString,
  };
};

export const makeMarketValueGraphData = (data: PriceSeriesSchema[]): MarketValueGraphData => {
  const dataWithType: PriceSeriesPoint[] = data.map((d) => ({ ...d, graphType: 'marketValue' }));
  const marketValueList = data.map((val) => val.marketValue);

  const max = Math.max(...marketValueList);
  const min = Math.min(...marketValueList);

  const baseGraphData = getBaseGraphData(dataWithType, min, max);

  return {
    ...baseGraphData,
    firstValueLine: getFirstValueLine(baseGraphData.lineGraph.getPoint(0).y),
    gradientArea: getGradientArea(baseGraphData.graphLineSVGString),
  };
};

export const makeHistoricalReturnGraphData = (data: PriceSeriesSchema[]): HistoricalReturnGraphData => {
  const dataWithType: PriceSeriesPoint[] = data.map((d) => ({ ...d, graphType: 'historicalReturn' }));
  const priceList = data.map((val) => val.price);

  const max = Math.max(...priceList);
  const min = Math.min(...priceList);

  const baseGraphData = getBaseGraphData(dataWithType, min, max);
  return {
    ...baseGraphData,
    gradientAreaSplit: getGradientAreaSplit(baseGraphData.graphLineSVGString),
  };
};

export const makeInstrumentGraphData = (data: InstrumentPrice[]): InstrumentGraphData => {
  const dataWithType: InstrumentPricePoint[] = data.map((datum) => ({ ...datum, graphType: 'instrument' }));
  const priceList = dataWithType.map((val) => val.price);

  const max = Math.max(...priceList);
  const min = Math.min(...priceList);

  const baseGraphData = getBaseGraphData(dataWithType, min, max);
  return {
    ...baseGraphData,
    firstValueLine: getFirstValueLine(baseGraphData.lineGraph.getPoint(0).y),
    gradientArea: getGradientArea(baseGraphData.graphLineSVGString),
  };
};

export const getIndexFromPosition = (x: number, width: number, steps: number) => {
  if (x <= 0 || width <= 0 || steps <= 0) {
    return 0;
  }
  const index = Math.max(0, Math.floor(x / (width / steps)));
  // If x is outside of the graph (or at the very end), return the last index
  return index >= steps ? steps - 1 : index;
};

export const getPointAtPositionInPath = (x: number, width: number, steps: number, path: SkPath) => {
  return path.getPoint(getIndexFromPosition(x, width, steps));
};
export const getPanGesture = (
  sharedXPos: SharedValue<number>,
  sharedIsTouching: SharedValue<boolean>,
  offset: number
) => {
  const isTouching = sharedIsTouching;
  const xPos = sharedXPos;
  return Gesture.Pan()
    .onBegin((e) => {
      // Only allow panning if the user is touching the main graph area
      if (e.y > offset && e.y < GRAPH_HEIGHT + offset) {
        isTouching.value = true;
        xPos.value = e.x - GRAPH_X_OFFSET;
      }
    })
    .onChange((e) => {
      if (e.y > offset && e.y < GRAPH_HEIGHT + offset) {
        // TODO: Add haptics?
        xPos.value = e.x - GRAPH_X_OFFSET;
      }
    })
    .onFinalize(() => {
      isTouching.value = false;
      // Set x pos to last point so current value (i.e. the value at the last point) is displayed.
      xPos.value = GRAPH_WIDTH;
    });
};
