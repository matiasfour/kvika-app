import * as React from 'react';

import {
  Easing,
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
  gradientArea: SkiaValue<SkPath>;
  rangeOffset: SkiaValue<number>;
  touchTransition: SkiaMutableValue<number>;
  graphTransition: SkiaMutableValue<number>;
};

/**
 * Renders a linear gradient area underneath the line graph.
 * @param gradientArea The Skia path for drawing the gradient area
 * @param rangeOffset Position of the start of the gradient (top part of line graph)
 * @param touchTransition The transition value when touching the graph
 * @param graphTransition
 */
export const GradientArea = ({ gradientArea, rangeOffset, touchTransition, graphTransition }: Props) => {
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

  const opacity = useValue(1);

  useValueEffect(graphTransition, (value) => {
    if (value === 1) {
      runTiming(opacity, 1, { duration: BASE_ANIMATION_SPEED, easing: Easing.inOut(Easing.ease) });
    } else {
      opacity.current = 0;
    }
  });

  const start = useComputedValue(() => {
    return vec(0, rangeOffset.current);
  }, [rangeOffset]);

  return (
    <Path path={gradientArea} opacity={opacity}>
      <LinearGradient start={start} end={vec(0, GRAPH_HEIGHT)} colors={gradientAreaColors} />
    </Path>
  );
};
