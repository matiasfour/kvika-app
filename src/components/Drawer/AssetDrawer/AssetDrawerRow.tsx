import { Colors } from '@kvika/theme';
import * as React from 'react';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import GradientText from '../../GradientText/GradientText';
import KvikaText from '../../KvikaText';
import { StyledRow } from './AssetDrawerRowStyles';

type Props = {
  title: string;
  value?: string;
  color?: Colors;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  titleColor?: Colors;
};
const AssetDrawerRow = ({ title, value, color, fontWeight, fontSize, titleColor }: Props) => {
  return (
    <StyledRow>
      <GradientText color={titleColor} fontSize={fontSize} fontWeight={fontWeight} text={title} width="56%" />
      {value && <KvikaText color={color}>{value}</KvikaText>}
    </StyledRow>
  );
};
export default AssetDrawerRow;
