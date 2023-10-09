import * as React from 'react';
import { getFormattedNumber } from '@kvika/string-utils';
import { Colors } from '@kvika/theme';
import { PortfolioTransactionSchema } from '@kvika/api-types';
import KvikaText from '../../../components/KvikaText';
import { FontSize } from '../../../dls/StyleGuide';
import { StyledRow, StyledTransactionContainer } from './TransactionsStyles';
import TransactionTypePills from './TransactionTypePills';
import { getFormattedDate } from '../../../utils/TimeUtils';
import GradientText from '../../../components/GradientText/GradientText';

type Props = {
  transaction: PortfolioTransactionSchema;
  onPress?: () => void;
};

const Transaction = ({ transaction, onPress }: Props) => {
  return (
    <StyledTransactionContainer onPress={onPress}>
      <StyledRow>
        <GradientText text={transaction.instrument.name} width="65%" />
        <KvikaText>{transaction.payment ? getFormattedNumber({ value: transaction.payment }) : ''}</KvikaText>
      </StyledRow>
      <StyledRow isLastRow>
        <KvikaText color={Colors.gold200} fontSize={FontSize.BodySmall}>
          {getFormattedDate(transaction.tradeDate)}
        </KvikaText>
        <TransactionTypePills
          transactionType={transaction.transactionType}
          movementStatus={transaction.movementStatus}
        />
      </StyledRow>
    </StyledTransactionContainer>
  );
};

export default Transaction;
