import { Colors } from '@kvika/theme';
import * as React from 'react';
import { ImageSourcePropType } from 'react-native';

import { FontSize, FontWeight } from '../../dls/StyleGuide';
import { StyledHeader, StyledText, StyledDescription, StyledLogo } from './KvikaLoginHeaderStyles';

type Props = {
  title: string;
  description: string;
  logo: ImageSourcePropType;
};

const KvikaLoginHeader = ({ title, description, logo }: Props) => {
  return (
    <StyledHeader>
      <StyledLogo source={logo} />
      <StyledText fontSize={FontSize.XL} fontWeight={FontWeight.Light}>
        {title}
      </StyledText>
      <StyledDescription color={Colors.gold150}>{description}</StyledDescription>
    </StyledHeader>
  );
};

export default KvikaLoginHeader;
