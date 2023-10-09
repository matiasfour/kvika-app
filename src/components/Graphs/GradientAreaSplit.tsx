import * as React from 'react';

import {
  Easing,
  Group,
  interpolateColors,
  LinearGradient,
  Path,
  runTiming,
  SkiaMutableValue,
  SkiaValue,
  SkPath,
  useComputedValue,
  useValue,
  useValueEffect,
  vec,
} from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';
import { GRAPH_HEIGHT } from '../../constants/GraphConstants';
import { getColorWithOpacity } from '../../utils/Utils';
import { BASE_ANIMATION_SPEED } from '../../constants/GeneralConstants';

type Props = {
  gradientAreaSplit: SkiaValue<SkPath>;
  rangeOffset: SkiaValue<number>;
  touchTransition: SkiaMutableValue<number>;
  graphTransition: SkiaMutableValue<number>;
};

/**
 * Renders 2 linear gradient areas between the line graph and the zero y-value line.
 * @param gradientAreaSplit The Skia path for drawing the gradient area for positive/negative values
 * @param rangeOffset Position of the start of the gradient (from top for positive values, from bottom for negative values)
 * @param touchTransition The transition value when touching the graph
 * @param graphTransition The transition value when switching between graphs
 */
export const GradientAreaSplit = ({ gradientAreaSplit, rangeOffset, touchTransition, graphTransition }: Props) => {
  const gradientAreaColors = useComputedValue(() => {
    return [
      interpolateColors(
        touchTransition.current,
        [0, 1],
        [getColorWithOpacity(Colors.gold600, 35), getColorWithOpacity(Colors.gold600, 65)]
      ),
      getColorWithOpacity(Colors.gold300, 0),
    ];
  }, [touchTransition]);

  const startPointPos = useComputedValue(() => vec(0, rangeOffset.current), [rangeOffset]);
  const startPointNeg = useComputedValue(() => vec(0, GRAPH_HEIGHT - rangeOffset.current), [rangeOffset]);

  const opacity = useValue(1);

  useValueEffect(graphTransition, (value) => {
    if (value === 1) {
      runTiming(opacity, 1, { duration: BASE_ANIMATION_SPEED, easing: Easing.inOut(Easing.ease) });
    } else {
      opacity.current = 0;
    }
  });

  return (
    <Group>
      <Path path={gradientAreaSplit} opacity={opacity}>
        <LinearGradient start={startPointPos} end={vec(0, GRAPH_HEIGHT / 2)} colors={gradientAreaColors} />
      </Path>
      <Path path={gradientAreaSplit} opacity={opacity}>
        <LinearGradient start={startPointNeg} end={vec(0, GRAPH_HEIGHT / 2)} colors={gradientAreaColors} />
      </Path>
    </Group>
  );
};
