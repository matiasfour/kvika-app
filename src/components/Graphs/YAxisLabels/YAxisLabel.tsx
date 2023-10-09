import * as React from 'react';

import { Colors } from '@kvika/theme';
import { Group, RoundedRect, SkFont, Text } from '@shopify/react-native-skia';
import { getColorWithOpacity } from '../../../utils/Utils';

type Props = {
  textFont: SkFont;
  text: string;
  offset: number;
};

/**
 * Renders a single horizontal label to indicate y-values at specific intervals,
 * shown on the left side of the graph.
 * @param textFont The font to use for the label text.
 * @param text The text to display.
 * @param offset The offset from the top of the graph to the label.
 * @returns
 */
export const YAxisLabel = ({ textFont, text, offset }: Props) => {
  const labelWidth = textFont.getTextWidth(text) + 16;

  return (
    <Group transform={[{ translateY: offset }]}>
      <RoundedRect x={4} y={0} color={getColorWithOpacity(Colors.gray900, 80)} r={2} width={labelWidth} height={20} />
      <Text x={10} y={textFont.getSize() + 3.5} color={Colors.gold150} text={text} font={textFont} />
    </Group>
  );
};
