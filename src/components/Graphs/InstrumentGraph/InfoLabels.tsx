import * as React from 'react';
import {
  Group,
  SkiaMutableValue,
  SkiaValue,
  SkPoint,
  Text,
  useComputedValue,
  useFont,
} from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';
import { getFormattedNumber } from '@kvika/string-utils';

import fontFile from '../../../../assets/fonts/AkzidenzGroteskPro-Regular.otf';
import { FontSize } from '../../../dls/StyleGuide';
import { DataPoint, getIndexFromPosition } from '../../../utils/GraphUtils';
import { GRAPH_WIDTH, HEADING_X_OFFSET, INSTRUMENT_HEADING_HEIGHT } from '../../../constants/GraphConstants';
import { getPercentageWithPrefixFromFraction } from '../../../utils/Utils';
import { getFormattedDate } from '../../../utils/TimeUtils';
import { TransactionDrawerText } from '../../../constants/Text';

const PRICE_OFFSET = 60;

type Props = {
  data: SkiaValue<DataPoint[]>;
  cursorPos: SkiaMutableValue<SkPoint>;
};

/**
 * Renders the instrument graph info labels above the graph. Default heading to the left, date to the right.
 * @param props.cursorPos The current position of the graph cursor
 * @param props.touchTransition The transition value when touching the graph
 * @param props.data The data from which we can derive the date value to display (right side)
 */

export const InfoLabels = ({ data, cursorPos }: Props) => {
  const textFont = useFont(fontFile, FontSize.Body);

  const textInfo = useComputedValue(() => {
    const index = getIndexFromPosition(cursorPos.current.x, GRAPH_WIDTH, data.current.length);
    const originalPrice = data.current[0]?.price ?? 1; // Default to 1 to avoid division by 0
    const price = index < data.current.length ? data.current[index].price : 0;
    const percentage = (price - originalPrice) / originalPrice;
    const percentageText = getPercentageWithPrefixFromFraction(percentage);
    const priceText = getFormattedNumber({
      value: price,
      showSymbol: false,
      significantDigits: 4,
      showTrailingZeros: true,
    });
    const percentageXPos = textFont ? textFont.getTextWidth(priceText) + PRICE_OFFSET + HEADING_X_OFFSET + 4 : 0;
    const percentageColor = percentage >= 0 ? Colors.successDark100 : Colors.negativeDark100;
    const date =
      index < data.current.length ? data.current[index].timestamp : data.current[data.current.length - 1].timestamp;
    const dateText = getFormattedDate(date, true);
    const textWidth = textFont?.getTextWidth(dateText) ?? 0;
    const dateTextXPos = GRAPH_WIDTH - textWidth - HEADING_X_OFFSET;
    return {
      percentageText,
      priceText,
      percentageColor,
      dateText,
      dateTextXPos,
      percentageXPos,
    };
  }, [data, cursorPos, textFont]);

  // TODO: Use Skia Selector when we upgrade library to 0.1.142 or higher,
  // that will make this code much cleaner.
  const percentageText = useComputedValue(() => textInfo.current.percentageText, [textInfo]);
  const priceText = useComputedValue(() => textInfo.current.priceText, [textInfo]);
  const percentageColor = useComputedValue(() => textInfo.current.percentageColor, [textInfo]);
  const dateText = useComputedValue(() => textInfo.current.dateText, [textInfo]);
  const dateTextXPos = useComputedValue(() => textInfo.current.dateTextXPos, [textInfo]);
  const percentageXPos = useComputedValue(() => textInfo.current.percentageXPos, [textInfo]);

  if (!textFont) {
    return null;
  }

  const textY = INSTRUMENT_HEADING_HEIGHT + textFont.getSize() + 1.5;

  return (
    <Group>
      <Text x={HEADING_X_OFFSET} y={textY} color={Colors.gold250} text={TransactionDrawerText.Rate} font={textFont} />
      <Text x={PRICE_OFFSET} y={textY} color={Colors.gold150} text={priceText} font={textFont} />
      <Text x={percentageXPos} y={textY} color={percentageColor} text={percentageText} font={textFont} />
      <Text x={dateTextXPos} y={textY} font={textFont} text={dateText} color={Colors.gold250} />
    </Group>
  );
};
