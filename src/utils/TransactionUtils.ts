import {
  GetPortfolioTransactionsResponseSchema,
  PortfolioTransactionMovementStatusTypeEnum,
  PortfolioTransactionSchema,
  PortfolioTransactionTypeEnum,
} from '@kvika/api-types';
import { TransactionsScreenText } from '../constants/Text';
import { TRANSACTION_GROUPS } from '../constants/TransactionsConstants';
import { AssetType, PagedTransactions, TransactionPill } from '../types/Types';

export const DEFAULT_PAGE_SIZE = 100;

export const orderTransactionFilters = (a: TransactionPill, b: TransactionPill): number => {
  if (a.text === TransactionsScreenText.AllTransactions) return -1;
  if (b.text === TransactionsScreenText.AllTransactions) return 1;

  if (a.text === TransactionsScreenText.BuyOrSell) return -1;
  if (b.text === TransactionsScreenText.BuyOrSell) return 1;

  if (a.text === TransactionsScreenText.CashDividends) return -1;
  if (b.text === TransactionsScreenText.CashDividends) return 1;

  if (a.text === TransactionsScreenText.Fee) return -1;
  if (b.text === TransactionsScreenText.Fee) return 1;

  if (a.text === TransactionsScreenText.InstallmentAndInterests) return -1;
  if (b.text === TransactionsScreenText.InstallmentAndInterests) return 1;

  if (a.text === TransactionsScreenText.Tax) return -1;
  if (b.text === TransactionsScreenText.Tax) return 1;

  if (a.text === TransactionsScreenText.Other) return -1;
  if (b.text === TransactionsScreenText.Other) return 1;

  return a.text < b.text ? -1 : 1;
};

export const getTransactionsFilters = (allSelectedTransactions: PortfolioTransactionSchema[]) => {
  const uniqueTypes = allSelectedTransactions.reduce((filters: TransactionPill[], transaction) => {
    const group = TRANSACTION_GROUPS.find((group) => group.types.some((type) => type === transaction.transactionType));
    if (group) {
      if (!filters.some((filter) => filter.text === group.text)) {
        filters.push(group);
      }
    }
    return filters;
  }, []);

  return [TRANSACTION_GROUPS[0], ...uniqueTypes].sort(orderTransactionFilters);
};

export const getFilteredTransactions = (
  types: AssetType[] | PortfolioTransactionTypeEnum[],
  allSelectedTransactions: PortfolioTransactionSchema[]
) => {
  if (types.length > 0) {
    return allSelectedTransactions.filter((transaction) => types.some((type) => type === transaction.transactionType));
  }
  return allSelectedTransactions;
};

export const getUnsettledTransactionRowsForStatus = (
  transactions: PortfolioTransactionSchema[],
  movementStatus:
    | PortfolioTransactionMovementStatusTypeEnum.UNCONFIRMED
    | PortfolioTransactionMovementStatusTypeEnum.REGISTERED,
  filter?: TransactionPill
) => {
  const transactionsForStatus = transactions.filter((transaction) => transaction.movementStatus === movementStatus);
  const groupHeading =
    movementStatus === PortfolioTransactionMovementStatusTypeEnum.UNCONFIRMED
      ? TransactionsScreenText.UnconfirmedTransactions
      : TransactionsScreenText.UnprocessedTransactions;
  const filteredTransactions = filter
    ? getFilteredTransactions(filter.types, transactionsForStatus)
    : transactionsForStatus;
  if (filteredTransactions.length > 0) {
    return [groupHeading, ...filteredTransactions];
  }
  return [];
};

export const getTransactionRows = (
  allTransactions: GetPortfolioTransactionsResponseSchema,
  filter?: TransactionPill
) => {
  const { unsettled, transactions } = allTransactions;

  const unconfirmedTransactionRows = getUnsettledTransactionRowsForStatus(
    unsettled,
    PortfolioTransactionMovementStatusTypeEnum.UNCONFIRMED,
    filter
  );
  const unprocessedTransacationRows = getUnsettledTransactionRowsForStatus(
    unsettled,
    PortfolioTransactionMovementStatusTypeEnum.REGISTERED,
    filter
  );

  const filteredTransactions = filter ? getFilteredTransactions(filter.types, transactions) : transactions;
  const sortedTransactions = [...filteredTransactions].sort((a, b) => (a.tradeDate > b.tradeDate ? -1 : 1));
  const settledTransactionRows = sortedTransactions.reduce<(PortfolioTransactionSchema | string)[]>(
    (acc, currTransaction) => {
      const year = currTransaction.tradeDate.substring(0, 4);
      const shouldAddYear = !acc.includes(year);
      if (shouldAddYear) {
        acc.push(year);
      }
      acc.push(currTransaction);
      return acc;
    },
    []
  );

  return [...unconfirmedTransactionRows, ...unprocessedTransacationRows, ...settledTransactionRows];
};

type TransactionsGroupedByFilters = Record<string, (string | PortfolioTransactionSchema)[]>;

export const getGroupedTransactionRows = (
  allTransactions: GetPortfolioTransactionsResponseSchema,
  filters: TransactionPill[]
) => {
  return filters.reduce((acc: TransactionsGroupedByFilters, curr) => {
    if (!acc[curr.text]) {
      acc[curr.text] = getTransactionRows(allTransactions, curr.types.length > 0 ? curr : undefined);
    }
    return acc;
  }, {});
};

export const getAllTransactions = (
  unsettled: PortfolioTransactionSchema[],
  transactions: PagedTransactions
): GetPortfolioTransactionsResponseSchema => {
  const allTransactions = Object.values(transactions).flat();
  return {
    unsettled,
    transactions: allTransactions,
  };
};
