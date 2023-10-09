import * as React from 'react';

import { Group, SkiaValue, SkPath, Drawing, Skia, useFont } from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';

import { GRAPH_HEIGHT, GRAPH_WIDTH, GRAPH_X_OFFSET } from '../../constants/GraphConstants';
import { FontSize } from '../../dls/StyleGuide';
import fontFile from '../../../assets/fonts/AkzidenzGroteskPro-Medium.otf';
import { XIntervalDisplayData } from '../../utils/GraphUtils';

type Props = {
  lineGraph: SkiaValue<SkPath>;
  xIntervalData: SkiaValue<XIntervalDisplayData[]>;
};

const Y_OFFSET = GRAPH_HEIGHT + FontSize.BodySmall + 16;
const X0_OFFSET = 4;

/**
 * Renders vertical lines on graph to indicate specific time intervals on x-axis,
 * e.g. Jan, Feb, Mar, Apr, Maí, etc.
 */
export const XAxisIntervalsAndLabels = ({ lineGraph, xIntervalData }: Props) => {
  const textFont = useFont(fontFile, FontSize.BodySmall);

  if (!textFont) {
    return null;
  }

  return (
    <Group>
      <Drawing
        drawing={({ canvas, paint }) => {
          xIntervalData.current.forEach((interval) => {
            const { x } = lineGraph.current.getPoint(interval.index);
            paint.setColor(Skia.Color(Colors.black11));
            paint.setStrokeWidth(1);
            canvas.drawLine(x, 0, x, GRAPH_HEIGHT, paint);
            paint.setColor(Skia.Color(Colors.gray400));
            const width = textFont.getTextWidth(interval.displayValue);
            // Don't show text if it's very close to the right edge of the graph
            if (x + width < GRAPH_WIDTH + GRAPH_X_OFFSET) {
              canvas.drawText(interval.displayValue, x === 0 ? X0_OFFSET : x, Y_OFFSET, paint, textFont);
            }
          });
        }}
      />
    </Group>
  );
};
