import * as React from 'react';
import KvikaText from '../../KvikaText';
import { StyledRow } from './TransactionDrawerStyles';

type Props = { title: string; value: string | number };

const TransactionDrawerRow = ({ title, value }: Props) => {
  return (
    <StyledRow>
      <KvikaText>{title}</KvikaText>
      <KvikaText>{value}</KvikaText>
    </StyledRow>
  );
};
export default TransactionDrawerRow;
