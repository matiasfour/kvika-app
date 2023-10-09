import * as React from 'react';

import {
  Circle,
  Group,
  Line,
  SkiaMutableValue,
  SkiaValue,
  SkPoint,
  useComputedValue,
  vec,
} from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';

import { GRAPH_HEIGHT } from '../../constants/GraphConstants';

type Props = {
  position: SkiaMutableValue<SkPoint>;
  opacity: SkiaMutableValue<number>;
  lastPoint: SkiaValue<SkPoint>;
  graphTransition: SkiaMutableValue<number>;
};

/**
 * Renders a cursor that appears when touching graph.
 * The cursor is a small circle on the line along with a vertical indicator.
 * @param position The current touch position
 * @param opacity Value is 1 (shown) during touch, otherwise 0 (hidden)
 */
export const Cursor = ({ position, opacity, lastPoint, graphTransition }: Props) => {
  const indicatorLineP1 = useComputedValue(() => vec(position.current.x, 0), [position]);
  const indicatorLineP2 = useComputedValue(() => vec(position.current.x, GRAPH_HEIGHT), [position]);

  const reverseOpacity = useComputedValue(
    () => (graphTransition.current === 1 ? 1 - opacity.current : 0),
    [opacity, graphTransition]
  );

  const circlePos = useComputedValue(() => {
    return vec(lastPoint.current.x, lastPoint.current.y);
  }, [lastPoint]);

  return (
    <Group>
      <Line p1={indicatorLineP1} p2={indicatorLineP2} color={Colors.gold150} strokeWidth={1} opacity={opacity} />
      <Circle c={position} r={8} color={Colors.gold150} opacity={opacity} />
      <Circle color={Colors.gold400} c={position} r={7} opacity={opacity} />
      {/* This circle is always at the end of the graph, only visible when not touching */}
      <Circle color={Colors.gold400} c={circlePos} r={4} opacity={reverseOpacity} />
    </Group>
  );
};
