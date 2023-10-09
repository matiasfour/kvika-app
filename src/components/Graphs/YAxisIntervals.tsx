import * as React from 'react';

import { Group, Line, vec } from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';
import { GRAPH_HEIGHT, GRAPH_WIDTH } from '../../constants/GraphConstants';

type Props = {
  boldMiddleLine?: boolean;
};

/**
 * Renders horizontal lines on graph to indicate specific intervals on y-axis,
 * e.g. 0 kr., 10 m.kr., 20 m.kr., 30 m.kr., 40 m.kr.
 * @param boldMiddleLine
 */
export const YAxisIntervals = ({ boldMiddleLine }: Props) => {
  return (
    <Group>
      <Line p1={vec(0, 0)} p2={vec(GRAPH_WIDTH, 0)} color={Colors.gray800} style="stroke" strokeWidth={1} />
      <Line
        p1={vec(0, GRAPH_HEIGHT * 0.25)}
        p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT * 0.25)}
        color={Colors.gray800}
        style="stroke"
        strokeWidth={1}
      />
      <Line
        p1={vec(0, GRAPH_HEIGHT * 0.5)}
        p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT * 0.5)}
        color={boldMiddleLine ? Colors.gray400 : Colors.gray800}
        style="stroke"
        strokeWidth={1}
      />
      <Line
        p1={vec(0, GRAPH_HEIGHT * 0.75)}
        p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT * 0.75)}
        color={Colors.gray800}
        style="stroke"
        strokeWidth={1}
      />
      <Line
        p1={vec(0, GRAPH_HEIGHT)}
        p2={vec(GRAPH_WIDTH, GRAPH_HEIGHT)}
        color={Colors.gray800}
        style="stroke"
        strokeWidth={1}
      />
    </Group>
  );
};
