import { ApiError } from '@kvika/api-client';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import KvikaApiClient from '../api/KvikaApiClient';
import { updateIsLoadingPortfoliosPerformance, updatePortfoliosPerformance } from '../store/portfolio';
import { updateIsLoadingTransactions, updateTransactions } from '../store/transactions';
import { Period } from '../types/Types';
import { errorHandling } from './ErrorUtils';
import { DEFAULT_PAGE_SIZE } from './TransactionUtils';
import { getPortfoliosPerformanceId } from './Utils';

export const handleGetPortfoliosPerformance = (
  dispatch: Dispatch<AnyAction>,
  period: Period,
  portfolioIds: number[],
  callback?: () => void
) => {
  const today = new Date();
  const ppid = getPortfoliosPerformanceId(portfolioIds, period, today);
  if (ppid) {
    dispatch(updateIsLoadingPortfoliosPerformance(true));
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      client
        .getPortfoliosPerformance(ppid)
        .then((portfolioCompositionPerformance) => {
          dispatch(updatePortfoliosPerformance(portfolioCompositionPerformance));
        })
        .catch((error: ApiError) => {
          dispatch(updateIsLoadingPortfoliosPerformance(false));
          errorHandling({ error });
        })
        .finally(() => {
          callback && callback();
        });
    });
  }
};

export const handleGetPortfoliosPerformanceTransactions = (
  dispatch: Dispatch<AnyAction>,
  period: Period,
  portfolioIds: number[],
  page: number,
  callback?: () => void
) => {
  const today = new Date();
  const ppid = getPortfoliosPerformanceId(portfolioIds, period, today);
  if (ppid) {
    dispatch(updateIsLoadingTransactions(true));
    KvikaApiClient.getApiClient({ dispatch }).then((client) => {
      client
        .getPortfoliosPerformanceTransactions(ppid, page, DEFAULT_PAGE_SIZE)
        .then((portfolioPerformanceTransactions) => {
          dispatch(updateTransactions({ page, portfoliosTransactions: portfolioPerformanceTransactions }));
        })
        .catch((error: ApiError) => {
          dispatch(updateIsLoadingTransactions(false));
          errorHandling({ error });
        })
        .finally(() => {
          callback && callback();
        });
    });
  }
};
