import { GetPortfolioTransactionsResponseSchema, PortfolioTransactionSchema } from '@kvika/api-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { PagedTransactions } from '../types/Types';
import { logout } from './user';
import { updatePeriod, updatePortfolioIds } from './ppid';
import { DEFAULT_PAGE_SIZE } from '../utils/TransactionUtils';

type TransactionsSchema = {
  page: number;
  portfoliosTransactions: GetPortfolioTransactionsResponseSchema;
};

type TransactionsState = {
  transactions: {
    unsettled: PortfolioTransactionSchema[];
    pagedTransactions: PagedTransactions;
  };
  isLoadingTransactions: boolean;
  canGetMoreTransactions: boolean;
  transactionsPage: number;
};

const initialState: TransactionsState = {
  transactions: {
    unsettled: [],
    pagedTransactions: [],
  },
  isLoadingTransactions: false,
  canGetMoreTransactions: true,
  transactionsPage: 1,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    updateTransactions(state, action: PayloadAction<TransactionsSchema>) {
      const { page, portfoliosTransactions } = action.payload;
      const canGetMoreTransactions = portfoliosTransactions.transactions.length === DEFAULT_PAGE_SIZE;
      const flushData = page === 1;
      return {
        ...state,
        transactions: {
          pagedTransactions: flushData
            ? {
                [page]: portfoliosTransactions.transactions,
              }
            : {
                ...state.transactions.pagedTransactions,
                [page]: portfoliosTransactions.transactions,
              },
          unsettled: portfoliosTransactions.unsettled,
        },
        canGetMoreTransactions,
        transactionsPage: canGetMoreTransactions ? page + 1 : page,
        isLoadingTransactions: false,
      };
    },
    updateIsLoadingTransactions(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoadingTransactions: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
    builder.addCase(updatePeriod, () => initialState);
    builder.addCase(updatePortfolioIds, () => initialState);
  },
});

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectIsLoadingTransactions = (state: RootState): boolean => state.transactions.isLoadingTransactions;
export const selectCanGetMoreTransactions = (state: RootState): boolean => state.transactions.canGetMoreTransactions;
export const selectTransactionsPage = (state: RootState): number => state.transactions.transactionsPage;

export const { updateTransactions, updateIsLoadingTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
