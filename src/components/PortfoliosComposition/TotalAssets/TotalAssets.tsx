import * as React from 'react';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import { StyledAmount, StyledTotalAssets, StyledTotalAssetsContainer } from './TotalAssetsStyles';

type Props = {
  heading: string;
  amount: number;
};

const TotalAssets = ({ heading, amount }: Props) => {
  return (
    <StyledTotalAssetsContainer>
      <StyledTotalAssets fontWeight={FontWeight.Medium} fontSize={FontSize.BodySmall} color={Colors.gold250}>
        {heading}
      </StyledTotalAssets>
      <StyledAmount allowFontScaling={false} fontSize={FontSize.Large} color={Colors.gold150}>
        {getFormattedNumber({ value: amount })}
      </StyledAmount>
    </StyledTotalAssetsContainer>
  );
};

export default TotalAssets;
