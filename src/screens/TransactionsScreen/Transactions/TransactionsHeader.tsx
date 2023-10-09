import { Colors } from '@kvika/theme';
import * as React from 'react';
import KvikaText from '../../../components/KvikaText';
import { FontWeight } from '../../../dls/StyleGuide';
import { StyledHeaderContainer } from './TransactionsStyles';

type Props = { title: string };

const TransactionsHeader = ({ title }: Props) => {
  return (
    <StyledHeaderContainer>
      <KvikaText color={Colors.gold200} fontWeight={FontWeight.Medium}>
        {title}
      </KvikaText>
    </StyledHeaderContainer>
  );
};
export default TransactionsHeader;
