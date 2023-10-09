import * as React from 'react';

import { Colors } from '@kvika/theme';
import { getFormattedNumber } from '@kvika/string-utils';
import { SkiaMutableValue, SkiaValue, SkPoint, Text, useComputedValue, useFont } from '@shopify/react-native-skia';

import { FontSize } from '../../dls/StyleGuide';
import { GRAPH_WIDTH, HEADING_HEIGHT, HEADING_X_OFFSET } from '../../constants/GraphConstants';
import { DataPoint, getIndexFromPosition } from '../../utils/GraphUtils';
import fontFile from '../../../assets/fonts/AkzidenzGroteskPro-Regular.otf';
import { getAmountWithPrefix } from '../../utils/Utils';

type Props = {
  data: SkiaValue<DataPoint[]>;
  cursorPos: SkiaMutableValue<SkPoint>;
  showPrefix?: boolean;
  tempGain?: number;
};

const getAmount = (datum: DataPoint): number => {
  if (datum.graphType === 'marketValue') {
    return datum.marketValue;
  }
  if (datum.graphType === 'historicalReturn') {
    // TODO: Change to gain once BE returns it
    return datum.marketValue;
  }
  return 0;
};

/**
 * Displays the text value to be shown underneath the graph header.
 * This value updates as the user moves the cursor along the graph.
 * @param data The data to be displayed
 * @param cursorPos The current position of the graph cursor
 * @param showPrefix Whether to show a + or - prefix for the value
 * @param tempGain TODO: Temporary gain value to be displayed until BE returns gain
 */
export const ValueLabel = ({ cursorPos, showPrefix = false, data, tempGain = 0 }: Props) => {
  const textFont = useFont(fontFile, FontSize.Large);

  const valueText = useComputedValue(() => {
    const index = getIndexFromPosition(cursorPos.current.x, GRAPH_WIDTH, data.current.length);
    const amount = index < data.current.length ? getAmount(data.current[index]) : 0;
    return showPrefix
      ? // TODO: Temporary fix until BE returns gain
        // getAmountWithPrefix(amount)
        getAmountWithPrefix(tempGain)
      : getFormattedNumber({ value: amount });
  }, [data, cursorPos]);

  if (!textFont) {
    return null;
  }

  // FontSize is used for y to offset the Text since the y origin of Text is the bottom of the text, not the top.
  return (
    <Text
      x={HEADING_X_OFFSET}
      y={textFont.getSize() + HEADING_HEIGHT}
      font={textFont}
      text={valueText}
      color={Colors.gold150}
    />
  );
};
