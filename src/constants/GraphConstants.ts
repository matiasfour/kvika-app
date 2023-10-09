import { Dimensions } from 'react-native';
import { FontSize } from '../dls/StyleGuide';

const windowWidth = Dimensions.get('window').width;

export const CANVAS_WIDTH = windowWidth;
export const GRAPH_X_OFFSET = 8;
export const GRAPH_HEIGHT = 230;
export const GRAPH_WIDTH = CANVAS_WIDTH - GRAPH_X_OFFSET * 2;
export const HEADING_HEIGHT = FontSize.BodySmall + 4;
export const INSTRUMENT_HEADING_HEIGHT = 0; // Leaving this here for future use, if we want to add a heading to the instrument graph
export const INSTRUMENT_SUBHEADING_HEIGHT = FontSize.Body;
export const INSTRUMENT_HEADER_HEIGHT = INSTRUMENT_HEADING_HEIGHT + INSTRUMENT_SUBHEADING_HEIGHT + 16;
export const VALUE_LABEL_HEIGHT = FontSize.XL + 12;
export const HEADING_X_OFFSET = 8;
export const Y_LABEL_HEIGHT = 20; // Leaving this here for future use, if we want to add a label to the y-axis
export const X_LABEL_HEIGHT = 24;
export const GRAPH_HEIGHT_WITH_AXIS_LABELS = GRAPH_HEIGHT + Y_LABEL_HEIGHT + X_LABEL_HEIGHT;
export const CANVAS_HEIGHT = GRAPH_HEIGHT_WITH_AXIS_LABELS + VALUE_LABEL_HEIGHT + HEADING_HEIGHT;
export const INSTRUMENT_CANVAS_HEIGHT = GRAPH_HEIGHT_WITH_AXIS_LABELS + INSTRUMENT_HEADER_HEIGHT;
export const Y_INTERVAL_COUNT = 4;
export const Y_INTERVAL_COUNT_FROM_CENTER = 2;

// Period constants
// The numbers here are a bit arbitrary, the most important thing it that they're a little higher than the period.
export const WEEK_CEIL = 8;
export const MONTH_CEIL = 32;
export const SIX_MONTH_CEIL = MONTH_CEIL * 6;
export const YEAR_CEIL = 367;
export const FIVE_YEAR_CEIL = YEAR_CEIL * 5;

export const GRAPH_Y_INTERVALS = [
  100_000_000, 10_000_000, 5_000_000, 1_000_000, 500_000, 100_000, 50_000, 10_000, 5_000, 1_000, 500, 100, 50, 10, 5, 1,
  0.5, 0.1, 0.05, 0.01, 0.005, 0.001, 0.0005, 0.0001,
];
