import * as React from 'react';

import { Path, SkiaMutableValue, SkiaValue, SkPath } from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';

type Props = {
  path: SkiaValue<SkPath>;
  graphTransition: SkiaMutableValue<number>;
};

/**
 * Renders the line graph for e.g. market value of selected portfolios over time.
 * @param path The Skia path for drawing the line graph
 */
export const LineGraph = ({ path, graphTransition }: Props) => {
  return <Path style="stroke" path={path} end={graphTransition} strokeWidth={2} color={Colors.gold400} />;
};
