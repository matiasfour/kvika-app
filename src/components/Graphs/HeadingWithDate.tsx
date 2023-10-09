import * as React from 'react';

import {
  Group,
  SkiaMutableValue,
  SkiaValue,
  LinearGradient,
  Rect,
  SkPoint,
  Text,
  useComputedValue,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { Colors } from '@kvika/theme';

import fontFileRegular from '../../../assets/fonts/AkzidenzGroteskPro-Regular.otf';
import fontFileMedium from '../../../assets/fonts/AkzidenzGroteskPro-Medium.otf';
import { GRAPH_WIDTH, GRAPH_X_OFFSET, HEADING_X_OFFSET } from '../../constants/GraphConstants';
import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { DataPoint, getIndexFromPosition } from '../../utils/GraphUtils';
import { getColorWithOpacity } from '../../utils/Utils';
import { getFormattedDate } from '../../utils/TimeUtils';

const DEFAULT_MARGIN = 4;
const RECT_OFFSET = 40;
const GRADIENT_OFFSET = 35;

type Props = {
  heading: string;
  cursorPos: SkiaMutableValue<SkPoint>;
  touchTransition: SkiaMutableValue<number>;
  data: SkiaValue<DataPoint[]>;
  fontWeight?: FontWeight;
  headingColor?: Colors;
  headingFontSize?: FontSize;
  dateFontSize?: FontSize;
  monthAsNumber?: boolean;
};

/**
 * Renders the heading above the graph. Default heading to the left, date to the right.
 * @param props.heading The heading to display (left side)
 * @param props.cursorPos The current position of the graph cursor
 * @param props.touchTransition The transition value when touching the graph
 * @param props.data The data from which we can derive the date value to display (right side)
 * @param props.fontWeight The font weight of the heading and date
 * @param props.headingColor The color of the heading
 * @param props.headingFontSize The font size of the heading
 * @param props.dateFontSize The font size of the date
 * @param props.monthAsNumber Whether to display the month as a number or as a string
 */
export const HeadingWithDate = ({
  heading,
  cursorPos,
  touchTransition,
  data,
  fontWeight = FontWeight.Medium,
  headingColor = Colors.gold400,
  headingFontSize = FontSize.BodySmall,
  dateFontSize = FontSize.BodySmall,
  monthAsNumber = false,
}: Props) => {
  const headingTextFont = useFont(fontWeight === FontWeight.Medium ? fontFileMedium : fontFileRegular, headingFontSize);
  const dateTextFont = useFont(fontWeight === FontWeight.Medium ? fontFileMedium : fontFileRegular, dateFontSize);

  const dateTextInfo = useComputedValue(() => {
    const index = getIndexFromPosition(cursorPos.current.x, GRAPH_WIDTH, data.current.length);
    const date =
      index < data.current.length ? data.current[index].timestamp : data.current[data.current.length - 1].timestamp;
    const dateText = getFormattedDate(date, monthAsNumber);
    const textWidth = dateTextFont?.getTextWidth(dateText) ?? 0;
    const dateTextXPos = GRAPH_WIDTH - textWidth - HEADING_X_OFFSET - DEFAULT_MARGIN;
    const rectXPos = dateTextXPos - RECT_OFFSET;
    return {
      dateText,
      dateTextXPos,
      dateTextColor: touchTransition.current || monthAsNumber ? Colors.gold250 : Colors.gold400,
      rectXPos,
      rectWidth: textWidth + RECT_OFFSET + DEFAULT_MARGIN + GRAPH_X_OFFSET,
      gradientStartPos: vec(rectXPos, 0),
      gradientEndPos: vec(rectXPos + GRADIENT_OFFSET, 0),
    };
  }, [data, cursorPos, touchTransition, dateTextFont]);

  // TODO: Use Skia Selector when we upgrade library to 0.1.142 or higher,
  // that will make this code much cleaner.
  const dateText = useComputedValue(() => dateTextInfo.current.dateText, [dateTextInfo]);
  const dateTextXPos = useComputedValue(() => dateTextInfo.current.dateTextXPos, [dateTextInfo]);
  const dateTextColor = useComputedValue(() => dateTextInfo.current.dateTextColor, [dateTextInfo]);
  const rectXPos = useComputedValue(() => dateTextInfo.current.rectXPos, [dateTextInfo]);
  const rectWidth = useComputedValue(() => dateTextInfo.current.rectWidth, [dateTextInfo]);
  const gradientStartPos = useComputedValue(() => dateTextInfo.current.gradientStartPos, [dateTextInfo]);
  const gradientEndPos = useComputedValue(() => dateTextInfo.current.gradientEndPos, [dateTextInfo]);

  if (!headingTextFont || !dateTextFont) {
    return null;
  }

  return (
    <Group>
      <Text
        x={HEADING_X_OFFSET}
        y={headingTextFont.getSize()}
        font={headingTextFont}
        text={heading}
        color={headingColor}
      />
      <Rect x={rectXPos} y={DEFAULT_MARGIN} width={rectWidth} height={headingTextFont.getSize() + 2}>
        <LinearGradient
          start={gradientStartPos}
          end={gradientEndPos}
          colors={[getColorWithOpacity(Colors.black7, 0), Colors.black7]}
        />
      </Rect>
      <Text x={dateTextXPos} y={headingTextFont.getSize()} font={dateTextFont} text={dateText} color={dateTextColor} />
    </Group>
  );
};
