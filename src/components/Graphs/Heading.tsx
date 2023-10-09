import * as React from 'react';

import {
  Group,
  SkiaValue,
  LinearGradient,
  Rect,
  Text,
  useComputedValue,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';

import fontFileRegular from '../../../assets/fonts/AkzidenzGroteskPro-Regular.otf';
import { GRAPH_WIDTH, HEADING_X_OFFSET } from '../../constants/GraphConstants';
import { FontSize } from '../../dls/StyleGuide';
import { DataPoint } from '../../utils/GraphUtils';
import { getColorWithOpacity } from '../../utils/Utils';

const DEFAULT_MARGIN = 4;
const RECT_OFFSET = 40;
const GRADIENT_OFFSET = 35;

type Props = {
  heading: string;
  data: SkiaValue<DataPoint[]>;
};

/**
 * Renders the heading above the graph. Default heading to the left, date to the right.
 * @param props.heading The heading to display (left side)
 * @param props.data The data from which we can derive the date value to display (right side)
 */
export const Heading = ({ heading, data }: Props) => {
  const headingTextFont = useFont(fontFileRegular, FontSize.H2);

  const dateTextInfo = useComputedValue(() => {
    const rectXPos = GRAPH_WIDTH - RECT_OFFSET;
    return {
      rectXPos,
      rectWidth: RECT_OFFSET + HEADING_X_OFFSET,
      gradientStartPos: vec(rectXPos, 0),
      gradientEndPos: vec(rectXPos + GRADIENT_OFFSET, 0),
    };
  }, [data]);

  // TODO: Use Skia Selector when we upgrade library to 0.1.142 or higher,
  // that will make this code much cleaner.
  const rectXPos = useComputedValue(() => dateTextInfo.current.rectXPos, [dateTextInfo]);
  const rectWidth = useComputedValue(() => dateTextInfo.current.rectWidth, [dateTextInfo]);
  const gradientStartPos = useComputedValue(() => dateTextInfo.current.gradientStartPos, [dateTextInfo]);
  const gradientEndPos = useComputedValue(() => dateTextInfo.current.gradientEndPos, [dateTextInfo]);

  if (!headingTextFont) {
    return null;
  }

  return (
    <Group>
      <Text
        x={HEADING_X_OFFSET}
        y={headingTextFont.getSize()}
        font={headingTextFont}
        text={heading}
        color={Colors.gold150}
      />
      <Rect x={rectXPos} y={DEFAULT_MARGIN} width={rectWidth} height={headingTextFont.getSize() + 2}>
        <LinearGradient
          start={gradientStartPos}
          end={gradientEndPos}
          colors={[getColorWithOpacity(Colors.black7, 0), Colors.black7]}
        />
      </Rect>
    </Group>
  );
};
