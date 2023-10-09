import { PortfolioAccessSchema, PortfolioCompositionPerformanceSchema } from '@kvika/api-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';
import { logout } from './user';

type PortfolioState = {
  portfolioAccess: PortfolioAccessSchema[];
  portfoliosPerformance?: PortfolioCompositionPerformanceSchema;
  isLoadingPortfoliosPerformance: boolean;
};

const initialState: PortfolioState = {
  portfolioAccess: [],
  portfoliosPerformance: undefined,
  isLoadingPortfoliosPerformance: false,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolioAccess(state, action: PayloadAction<PortfolioAccessSchema[]>) {
      return {
        ...state,
        portfolioAccess: action.payload,
      };
    },
    updatePortfoliosPerformance(state, action: PayloadAction<PortfolioCompositionPerformanceSchema>) {
      return {
        ...state,
        portfoliosPerformance: action.payload,
        isLoadingPortfoliosPerformance: false,
      };
    },
    updateIsLoadingPortfoliosPerformance(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoadingPortfoliosPerformance: action.payload,
      };
    },
    clearPortfoliosPerformance(state) {
      return {
        ...state,
        portfoliosPerformance: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const selectPortfolioAccess = (state: RootState): PortfolioAccessSchema[] => state.portfolio.portfolioAccess;
export const selectPortfoliosPerformance = (state: RootState): PortfolioCompositionPerformanceSchema | undefined =>
  state.portfolio.portfoliosPerformance;
export const selectIsLoadingPortfoliosPerformance = (state: RootState): boolean =>
  state.portfolio.isLoadingPortfoliosPerformance;

export const {
  updatePortfolioAccess,
  updatePortfoliosPerformance,
  updateIsLoadingPortfoliosPerformance,
  clearPortfoliosPerformance,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
