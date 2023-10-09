import * as React from 'react';

import { DashPathEffect, Path, SkiaMutableValue, SkiaValue, SkPath } from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';

type Props = {
  firstValueLine: SkiaValue<SkPath>;
  graphTransition: SkiaMutableValue<number>;
};

/**
 * Renders a single horizontal where the y value represents the first value in the graph,
 * i.e. to indicate the first value of the selected period/portfolio combination.
 * @param graphState The indices of the current and next graph
 */
export const FirstValueLine = ({ firstValueLine, graphTransition }: Props) => {
  return (
    <Path path={firstValueLine} color={Colors.goldGray500} style="stroke" strokeWidth={1} end={graphTransition}>
      <DashPathEffect intervals={[2, 2]} />
    </Path>
  );
};
