import { Colors } from '@kvika/theme';
import { LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import * as React from 'react';
import { GRAPH_HEIGHT, GRAPH_WIDTH } from '../../constants/GraphConstants';

/**
 * Renders a linear gradient area covering a part of the leftmost area of the graph.
 * This is to make the labels on top of it more readable.
 */
export const FadeLeft = () => {
  const width = GRAPH_WIDTH * 0.2;
  const height = GRAPH_HEIGHT - 1;

  return (
    <Rect x={0} y={0} width={width} height={height}>
      <LinearGradient start={vec(0, 0)} end={vec(width, 0)} colors={[Colors.black7, 'transparent']} flags={1} />
    </Rect>
  );
};
