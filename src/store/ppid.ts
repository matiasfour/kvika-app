import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Period } from '../types/Types';
import { logout } from './user';

type PPIDState = {
  period: Period;
  portfolioIds: number[];
};

const initialState: PPIDState = {
  period: Period.THIS_YEAR,
  portfolioIds: [],
};

export const ppidSlice = createSlice({
  name: 'ppid',
  initialState,
  reducers: {
    updatePeriod: (state, action: PayloadAction<Period>) => {
      return {
        ...state,
        period: action.payload,
      };
    },
    updatePortfolioIds: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        portfolioIds: Array.from(new Set(action.payload)),
      };
    },
    clearPPID() {
      return initialState;
    },
  },
  extraReducers: (builder) => builder.addCase(logout, () => initialState),
});

export const { updatePeriod, updatePortfolioIds, clearPPID } = ppidSlice.actions;

export const selectPeriod = (state: RootState) => state.ppid.period;
export const selectPortfolioIds = (state: RootState) => state.ppid.portfolioIds;

export default ppidSlice.reducer;
