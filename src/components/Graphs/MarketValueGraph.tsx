/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Easing } from 'react-native';

import { Canvas, Group, runTiming, useComputedValue, useSharedValueEffect, useValue } from '@shopify/react-native-skia';
import { GestureDetector, GestureType } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { PriceSeriesSchema } from '@kvika/api-types';

import { useAnalytics } from '@segment/analytics-react-native';
import { getPanGesture, getPointAtPositionInPath, makeMarketValueGraphData } from '../../utils/GraphUtils';
import { Cursor } from './Cursor';
import { GradientArea } from './GradientArea';
import { LineGraph } from './LineGraph';
import { FirstValueLine } from './FirstValueLine';
import { YAxisIntervals } from './YAxisIntervals';
import { ValueLabel } from './ValueLabel';
import { FadeLeft } from './FadeLeft';
import { YAxisLabels } from './YAxisLabels/YAxisLabels';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRAPH_WIDTH,
  GRAPH_X_OFFSET,
  HEADING_HEIGHT,
  VALUE_LABEL_HEIGHT,
  Y_LABEL_HEIGHT,
} from '../../constants/GraphConstants';
import { XAxisIntervalsAndLabels } from './XAxisIntervalsAndLabels';
import { StyledContainerView, StyledContentView } from './MarketValueGraphStyles';
import { OverviewScreenText } from '../../constants/Text';
import { BASE_ANIMATION_SPEED } from '../../constants/GeneralConstants';
import { HeadingWithDate } from './HeadingWithDate';
import { SegmentTrackingId } from '../../types/Types';

type Props = {
  marketValuePanRef: React.MutableRefObject<GestureType>;
  priceSeries: PriceSeriesSchema[];
};

const MarketValueGraph = ({ marketValuePanRef, priceSeries }: Props) => {
  const touchTransition = useValue(0);
  const graphTransition = useValue(1);

  const { track } = useAnalytics();

  // We need this as a Skia value so that we get native updates when this data changes
  const skiaData = useValue(makeMarketValueGraphData(priceSeries));

  const isTouching = useSharedValue(false);
  const xPos = useSharedValue(GRAPH_WIDTH);

  const panGesture = getPanGesture(xPos, isTouching, VALUE_LABEL_HEIGHT + HEADING_HEIGHT + Y_LABEL_HEIGHT / 2);

  const panGestureWithRef = React.useMemo(() => panGesture.withRef(marketValuePanRef), [panGesture, marketValuePanRef]);

  React.useEffect(() => {
    graphTransition.current = 0;
    runTiming(graphTransition, 1, { duration: 750, easing: Easing.inOut(Easing.cubic) });
  }, [priceSeries, graphTransition]);

  const touchTransitionStart = (end: number) => {
    if (isTouching.value) {
      track(SegmentTrackingId.ScrollInGraph, { graph: 'Market Value Graph' });
    }
    runTiming(touchTransition, end, {
      duration: BASE_ANIMATION_SPEED,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  useSharedValueEffect(() => {
    touchTransitionStart(isTouching.value ? 1 : 0);
  }, isTouching);

  // Default to last point in graph
  const cursorPos = useValue(
    getPointAtPositionInPath(GRAPH_WIDTH, GRAPH_WIDTH, skiaData.current.data.length, skiaData.current.lineGraph)
  );

  useSharedValueEffect(() => {
    const point = getPointAtPositionInPath(
      xPos.value,
      GRAPH_WIDTH,
      skiaData.current.data.length,
      skiaData.current.lineGraph
    );
    if (xPos.value === GRAPH_WIDTH) {
      // Use timeout so cursor is not visible at end of graph while fadeout animation is running.
      setTimeout(() => (cursorPos.current = point), BASE_ANIMATION_SPEED);
    } else {
      cursorPos.current = point;
    }
  }, xPos);

  // TODO: Replace all the computedValues with Skia selectors when we can update the library (Expo 47)
  const data = useComputedValue(() => skiaData.current.data, [skiaData]);
  const lineGraph = useComputedValue(() => skiaData.current.lineGraph, [skiaData]);
  const gradientArea = useComputedValue(() => skiaData.current.gradientArea, [skiaData]);
  const rangeOffset = useComputedValue(() => skiaData.current.rangeOffset, [skiaData]);
  const firstValueLine = useComputedValue(() => skiaData.current.firstValueLine, [skiaData]);
  const lastPt = useComputedValue(() => skiaData.current.lineGraph.getLastPt(), [skiaData]);
  const xIntervalData = useComputedValue(() => skiaData.current.xIntervalData, [skiaData]);

  React.useEffect(() => {
    skiaData.current = makeMarketValueGraphData(priceSeries);
  }, [priceSeries, skiaData]);

  return (
    <StyledContainerView>
      <StyledContentView>
        <GestureDetector gesture={panGestureWithRef}>
          <Canvas style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
            <Group transform={[{ translateX: GRAPH_X_OFFSET }]}>
              {/* Note that the order of elements matters as they're drawn on top of each other */}
              <HeadingWithDate
                data={data}
                cursorPos={cursorPos}
                touchTransition={touchTransition}
                heading={OverviewScreenText.MarketValue}
              />
              <ValueLabel data={data} cursorPos={cursorPos} />
              <Group transform={[{ translateY: VALUE_LABEL_HEIGHT + HEADING_HEIGHT }]}>
                <Group transform={[{ translateY: Y_LABEL_HEIGHT / 2 }]}>
                  <XAxisIntervalsAndLabels lineGraph={lineGraph} xIntervalData={xIntervalData} />
                  <YAxisIntervals />
                  <LineGraph path={lineGraph} graphTransition={graphTransition} />
                  <GradientArea
                    gradientArea={gradientArea}
                    rangeOffset={rangeOffset}
                    touchTransition={touchTransition}
                    graphTransition={graphTransition}
                  />
                  <FadeLeft />
                  <FirstValueLine firstValueLine={firstValueLine} graphTransition={graphTransition} />
                  <Cursor
                    position={cursorPos}
                    opacity={touchTransition}
                    lastPoint={lastPt}
                    graphTransition={graphTransition}
                  />
                </Group>
                <YAxisLabels labels={skiaData.current.yIntervalValues} />
              </Group>
            </Group>
          </Canvas>
        </GestureDetector>
      </StyledContentView>
    </StyledContainerView>
  );
};

export default MarketValueGraph;
