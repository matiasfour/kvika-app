import { Colors } from '@kvika/theme';
import * as React from 'react';
import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { getColorWithOpacity } from '../../utils/Utils';
import KvikaText from '../KvikaText';
import { StyledLinearGradient, StyledMaskedView } from './GradientTextStyles';

type Props = { text: string; width: string; color?: Colors; fontSize?: FontSize; fontWeight?: FontWeight };

const GradientText = ({ text, width, color, fontSize, fontWeight }: Props) => {
  return (
    <StyledMaskedView
      width={width}
      maskElement={
        <StyledLinearGradient
          end={[0.8, 0]}
          start={[1.0, 0]}
          colors={[getColorWithOpacity(Colors.black7, 0), Colors.black7]}
        />
      }
    >
      <KvikaText numberOfLines={1} color={color} fontSize={fontSize} fontWeight={fontWeight}>
        {text}
      </KvikaText>
    </StyledMaskedView>
  );
};
export default GradientText;
