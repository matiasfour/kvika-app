import * as React from 'react';
import { Colors } from '@kvika/theme';
import {
  Group,
  RoundedRect,
  SkiaMutableValue,
  SkiaValue,
  SkPoint,
  Text,
  useComputedValue,
  useFont,
} from '@shopify/react-native-skia';

import fontFile from '../../../assets/fonts/AkzidenzGroteskPro-Regular.otf';
import { FontSize } from '../../dls/StyleGuide';
import { DataPoint, getIndexFromPosition } from '../../utils/GraphUtils';
import { GRAPH_WIDTH, HEADING_HEIGHT, HEADING_X_OFFSET } from '../../constants/GraphConstants';
import { getPercentageWithPrefixFromFraction } from '../../utils/Utils';

type Props = {
  data: SkiaValue<DataPoint[]>;
  cursorPos: SkiaMutableValue<SkPoint>;
};

/**
 * Displays the green/red pill shown on the top right of the historical return graph.
 * @param data The data to display
 * @param cursorPos The current position of the graph cursor
 */
export const PillLabel = ({ data, cursorPos }: Props) => {
  const textFont = useFont(fontFile, FontSize.BodySmall);

  const textInfo = useComputedValue(() => {
    const index = getIndexFromPosition(cursorPos.current.x, GRAPH_WIDTH, data.current.length);
    const percentage = index < data.current.length ? data.current[index].price : 0;
    const text = getPercentageWithPrefixFromFraction(percentage);
    const width = textFont ? textFont.getTextWidth(text) + 12 : 0;
    // Temporarily removed until BE return gain
    // const rectX = GRAPH_WIDTH - width;
    const rectX = HEADING_X_OFFSET;
    const textX = rectX + 5;
    const textColor = percentage >= 0 ? Colors.successDark100 : Colors.negativeDark100;
    const rectColor = percentage >= 0 ? Colors.successDark700 : Colors.negativeDark700;
    return { text, width, rectX, textX, textColor, rectColor };
  }, [data, cursorPos, textFont]);

  // TODO: Use Skia Selector when we upgrade library to 0.1.142 or higher,
  // that will make this code much cleaner.
  const text = useComputedValue(() => textInfo.current.text, [textInfo]);
  const width = useComputedValue(() => textInfo.current.width, [textInfo]);
  const rectX = useComputedValue(() => textInfo.current.rectX, [textInfo]);
  const textX = useComputedValue(() => textInfo.current.textX, [textInfo]);
  const textColor = useComputedValue(() => textInfo.current.textColor, [textInfo]);
  const rectColor = useComputedValue(() => textInfo.current.rectColor, [textInfo]);

  if (!textFont) {
    return null;
  }

  const rectY = HEADING_HEIGHT + 4;
  const textY = rectY + textFont.getSize() + 3;

  return (
    <Group>
      <RoundedRect x={rectX} y={rectY} color={rectColor} r={2} width={width} height={24} />
      <Text x={textX} y={textY} color={textColor} text={text} font={textFont} />
    </Group>
  );
};
