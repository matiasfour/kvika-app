import * as React from 'react';

import { Group, useFont } from '@shopify/react-native-skia';

import fontFile from '../../../../assets/fonts/AkzidenzGroteskPro-Medium.otf';
import { FontSize } from '../../../dls/StyleGuide';
import { YAxisLabel } from './YAxisLabel';
import { GRAPH_HEIGHT } from '../../../constants/GraphConstants';

type Props = { labels: string[] };

/**
 * Renders the horizontal y-axis labels displayed on the left side of the graph.
 * @param labels
 */
export const YAxisLabels = ({ labels }: Props) => {
  const textFont = useFont(fontFile, FontSize.XS);

  if (!textFont) {
    return null;
  }

  return (
    <Group>
      {labels.map((label, index) => {
        return (
          <YAxisLabel
            key={label}
            text={label}
            textFont={textFont}
            offset={GRAPH_HEIGHT * (index / (labels.length - 1))}
          />
        );
      })}
    </Group>
  );
};
