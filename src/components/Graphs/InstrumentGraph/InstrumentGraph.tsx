/* eslint-disable no-return-assign */
import {
  Canvas,
  Easing,
  Group,
  runTiming,
  useComputedValue,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import * as React from 'react';
import { Gesture, GestureDetector, GestureType } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { BASE_ANIMATION_SPEED } from '../../../constants/GeneralConstants';
import {
  CANVAS_WIDTH,
  GRAPH_WIDTH,
  GRAPH_X_OFFSET,
  INSTRUMENT_CANVAS_HEIGHT,
  INSTRUMENT_HEADER_HEIGHT,
  Y_LABEL_HEIGHT,
} from '../../../constants/GraphConstants';
import { getPanGesture, getPointAtPositionInPath, InstrumentGraphData } from '../../../utils/GraphUtils';
import { Cursor } from '../Cursor';
import { FadeLeft } from '../FadeLeft';
import { FirstValueLine } from '../FirstValueLine';
import { GradientArea } from '../GradientArea';
import { LineGraph } from '../LineGraph';
import { XAxisIntervalsAndLabels } from '../XAxisIntervalsAndLabels';
import { YAxisIntervals } from '../YAxisIntervals';
import { YAxisLabels } from '../YAxisLabels/YAxisLabels';
import { InfoLabels } from './InfoLabels';

type Props = {
  graphData: InstrumentGraphData;
  onSetPanRef: (ref: React.MutableRefObject<GestureType | undefined>) => void;
};

export const InstrumentGraph = ({ graphData, onSetPanRef }: Props) => {
  const instrumentGraphPanRef = React.useRef<GestureType>(Gesture.Pan());
  const isTouching = useSharedValue(false);
  const xPos = useSharedValue(GRAPH_WIDTH);
  // We need this as a Skia value so that we get native updates when this data changes
  const skiaData = useValue(graphData);

  const touchTransition = useValue(0);
  const graphTransition = useValue(1);

  const panGesture = getPanGesture(xPos, isTouching, INSTRUMENT_HEADER_HEIGHT + Y_LABEL_HEIGHT / 2);
  const panGestureWithRef = React.useMemo(() => panGesture.withRef(instrumentGraphPanRef), [panGesture]);

  React.useEffect(() => {
    if (panGestureWithRef.config.ref) {
      onSetPanRef(panGestureWithRef.config.ref);
    }
  }, [onSetPanRef, panGestureWithRef.config.ref]);

  React.useEffect(() => {
    graphTransition.current = 0;
    runTiming(graphTransition, 1, { duration: 750, easing: Easing.inOut(Easing.cubic) });
  }, [graphData, graphTransition]);

  const touchTransitionStart = (end: number) => {
    runTiming(touchTransition, end, {
      duration: BASE_ANIMATION_SPEED,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  // Default to last point in graph
  const cursorPos = useValue(
    getPointAtPositionInPath(GRAPH_WIDTH, GRAPH_WIDTH, graphData.data.length, graphData.lineGraph)
  );

  useSharedValueEffect(() => {
    touchTransitionStart(isTouching.value ? 1 : 0);
  }, isTouching);

  React.useEffect(() => {
    skiaData.current = graphData;
  }, [graphData, skiaData]);

  useSharedValueEffect(() => {
    const point = getPointAtPositionInPath(
      xPos.value,
      GRAPH_WIDTH,
      skiaData.current.data.length,
      skiaData.current.lineGraph
    );
    if (xPos.value === GRAPH_WIDTH) {
      // Use timeout so cursor is not visible at end of graph while fadeout animation is running.
      setTimeout(() => (cursorPos.current = point), BASE_ANIMATION_SPEED);
    } else {
      cursorPos.current = point;
    }
  }, xPos);

  // TODO: Replace all the computedValues with Skia selectors when we can update the library (Expo 47)
  const data = useComputedValue(() => skiaData.current.data, [skiaData]);
  const lineGraph = useComputedValue(() => skiaData.current.lineGraph, [skiaData]);
  const gradientArea = useComputedValue(() => skiaData.current.gradientArea, [skiaData]);
  const rangeOffset = useComputedValue(() => skiaData.current.rangeOffset, [skiaData]);
  const firstValueLine = useComputedValue(() => skiaData.current.firstValueLine, [skiaData]);
  const lastPt = useComputedValue(() => skiaData.current.lineGraph.getLastPt(), [skiaData]);
  const xIntervalData = useComputedValue(() => skiaData.current.xIntervalData, [skiaData]);

  return (
    <GestureDetector gesture={panGestureWithRef}>
      <Canvas style={{ width: CANVAS_WIDTH, height: INSTRUMENT_CANVAS_HEIGHT }}>
        <Group transform={[{ translateX: GRAPH_X_OFFSET }]}>
          {/* Note that the order of elements matters as they're drawn on top of each other */}
          <InfoLabels data={data} cursorPos={cursorPos} />
          <Group transform={[{ translateY: INSTRUMENT_HEADER_HEIGHT }]}>
            <Group transform={[{ translateY: Y_LABEL_HEIGHT / 2 }]}>
              <XAxisIntervalsAndLabels lineGraph={lineGraph} xIntervalData={xIntervalData} />
              <YAxisIntervals />
              <LineGraph path={lineGraph} graphTransition={graphTransition} />
              <GradientArea
                gradientArea={gradientArea}
                rangeOffset={rangeOffset}
                touchTransition={touchTransition}
                graphTransition={graphTransition}
              />
              <FadeLeft />
              <FirstValueLine firstValueLine={firstValueLine} graphTransition={graphTransition} />
              <Cursor
                position={cursorPos}
                opacity={touchTransition}
                lastPoint={lastPt}
                graphTransition={graphTransition}
              />
            </Group>
            {/* TODO: Change to a Skia value later */}
            <YAxisLabels labels={graphData.yIntervalValues} />
          </Group>
        </Group>
      </Canvas>
    </GestureDetector>
  );
};
