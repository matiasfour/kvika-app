import * as React from 'react';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import KvikaText from '../../KvikaText';
import { StyledHeader } from './AssetDrawerStyles';

type Props = {
  title: string;
};

const AssetHeading = ({ title }: Props) => {
  return (
    <StyledHeader>
      <KvikaText fontSize={FontSize.H2} fontWeight={FontWeight.Regular}>
        {title}
      </KvikaText>
    </StyledHeader>
  );
};

export default AssetHeading;
