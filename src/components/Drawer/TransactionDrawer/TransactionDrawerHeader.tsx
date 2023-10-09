import { PortfolioTransactionSchema } from '@kvika/api-types';
import * as React from 'react';
import { FontSize } from '../../../dls/StyleGuide';
import TransactionTypePills from '../../../screens/TransactionsScreen/Transactions/TransactionTypePills';
import KvikaText from '../../KvikaText';
import { StyledHeaderPills, StyledHeaderRow } from './TransactionDrawerStyles';

type Props = { transaction: PortfolioTransactionSchema };

const TransactionDrawerHeader = ({ transaction }: Props) => {
  return (
    <StyledHeaderRow>
      <KvikaText fontSize={FontSize.H2}>{transaction.instrument.name}</KvikaText>
      <StyledHeaderPills>
        <TransactionTypePills
          transactionType={transaction.transactionType}
          movementStatus={transaction.movementStatus}
        />
      </StyledHeaderPills>
    </StyledHeaderRow>
  );
};
export default TransactionDrawerHeader;
