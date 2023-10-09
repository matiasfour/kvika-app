import { PortfolioTransactionSchema, PortfolioTransactionTypeEnum } from '@kvika/api-types';
import { getFormattedNumber } from '@kvika/string-utils';
import * as React from 'react';
import { TransactionDrawerText } from '../../../constants/Text';
import { getFormattedDate } from '../../../utils/TimeUtils';
import TransactionDrawerHeader from './TransactionDrawerHeader';
import TransactionDrawerRow from './TransactionDrawerRow';
import { StyledView } from './TransactionDrawerStyles';

type Props = { transaction: PortfolioTransactionSchema };

const TransactionDrawer = ({ transaction }: Props) => {
  const {
    price,
    tradeDate,
    settlementDate,
    commission,
    tax,
    quantity,
    currencyPrice,
    transactionYield,
    tradeFee,
    payment,
    comment,
    transactionType,
    instrument,
  } = transaction;
  const isDividend =
    transactionType === PortfolioTransactionTypeEnum.CASH_DIVIDEND ||
    transactionType === PortfolioTransactionTypeEnum.STOCK_DIVIDEND;
  return (
    <StyledView>
      <TransactionDrawerHeader transaction={transaction} />
      {payment ? (
        <TransactionDrawerRow title={TransactionDrawerText.Payment} value={getFormattedNumber({ value: payment })} />
      ) : null}
      <TransactionDrawerRow title={TransactionDrawerText.TradeDate} value={getFormattedDate(tradeDate)} />
      {settlementDate ? (
        <TransactionDrawerRow title={TransactionDrawerText.SettlementDate} value={getFormattedDate(settlementDate)} />
      ) : null}
      {quantity ? (
        <TransactionDrawerRow
          title={TransactionDrawerText.Quantity}
          value={getFormattedNumber({ value: quantity, showSymbol: false })}
        />
      ) : null}
      {price ? (
        <TransactionDrawerRow
          title={isDividend ? TransactionDrawerText.DividendPerShare : TransactionDrawerText.Rate}
          value={getFormattedNumber({ value: price, showSymbol: false, significantDigits: 3 })}
        />
      ) : null}
      <TransactionDrawerRow title={TransactionDrawerText.CurrencyCode} value={instrument.currencyCode} />
      {currencyPrice ? (
        <TransactionDrawerRow
          title={TransactionDrawerText.CurrencyPrice}
          value={getFormattedNumber({ value: currencyPrice, showSymbol: false, significantDigits: 2 })}
        />
      ) : null}
      {comment ? <TransactionDrawerRow title={TransactionDrawerText.Comment} value={comment} /> : null}
      {tax ? (
        <TransactionDrawerRow title={TransactionDrawerText.Tax} value={getFormattedNumber({ value: tax })} />
      ) : null}
      {transactionYield ? (
        <TransactionDrawerRow
          title={TransactionDrawerText.TransactionYield}
          value={getFormattedNumber({ value: transactionYield })}
        />
      ) : null}
      {tradeFee ? (
        <TransactionDrawerRow title={TransactionDrawerText.TradeFee} value={getFormattedNumber({ value: tradeFee })} />
      ) : null}
      {commission ? (
        <TransactionDrawerRow
          title={TransactionDrawerText.Commission}
          value={getFormattedNumber({ value: commission })}
        />
      ) : null}
    </StyledView>
  );
};
export default TransactionDrawer;
