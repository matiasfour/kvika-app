import { PortfolioTransactionMovementStatusTypeEnum, PortfolioTransactionTypeEnum } from '@kvika/api-types';
import { Colors } from '@kvika/theme';
import * as React from 'react';
import KvikaPill from '../../../components/KvikaPill/KvikaPill';
import { TransactionsScreenText, TransactionTypesText } from '../../../constants/Text';
import { FontWeight } from '../../../dls/StyleGuide';
import { StyledPillContainer } from './TransactionsStyles';

type Props = {
  transactionType: PortfolioTransactionTypeEnum;
  movementStatus: PortfolioTransactionMovementStatusTypeEnum;
};

const TransactionTypePills = ({ transactionType, movementStatus }: Props) => {
  const unprocessed = movementStatus === PortfolioTransactionMovementStatusTypeEnum.REGISTERED;
  const unconfirmed = movementStatus === PortfolioTransactionMovementStatusTypeEnum.UNCONFIRMED;
  const transactionTypeText = TransactionTypesText[transactionType];

  return (
    <StyledPillContainer>
      {(unprocessed || unconfirmed) && (
        <KvikaPill
          pill={{
            types: [],
            text: unprocessed ? TransactionsScreenText.Unprocessed : TransactionsScreenText.Unconfirmed,
          }}
          backgroundColor={Colors.warning700}
          fontWeight={FontWeight.Medium}
          fontColor={Colors.warning100}
          small
        />
      )}
      {transactionTypeText && (
        <KvikaPill
          pill={{ types: [], text: transactionTypeText }}
          backgroundColor={Colors.gray900}
          fontWeight={FontWeight.Medium}
          fontColor={Colors.goldGray400}
          small
        />
      )}
    </StyledPillContainer>
  );
};
export default TransactionTypePills;
