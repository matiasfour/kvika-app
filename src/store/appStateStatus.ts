import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateStatus } from 'react-native';

import { RootState } from '.';
import { ServiceStatusMode } from '../types/Types';

type PrevAndCurrStatus = {
  prevStatus: AppStateStatus;
  currStatus: AppStateStatus;
  serviceStatusMode: ServiceStatusMode;
};

const initialState: PrevAndCurrStatus = {
  prevStatus: 'unknown',
  currStatus: 'active',
  serviceStatusMode: {
    message: '',
  },
};

const appStateStatusSlice = createSlice({
  name: 'appStateStatus',
  initialState,
  reducers: {
    setAppStateStatus(_state, action: PayloadAction<PrevAndCurrStatus>) {
      return action.payload;
    },
    updateServiceStatusMode(state, action: PayloadAction<ServiceStatusMode>) {
      const { showAfter: prevShowAfter } = state.serviceStatusMode;
      const { showAfter } = action.payload;
      // Only update showAfter if the old showAfter timestamp has passed
      const updatedShowAfter = showAfter && prevShowAfter && showAfter < prevShowAfter ? prevShowAfter : showAfter;
      return {
        ...state,
        serviceStatusMode: {
          ...state.serviceStatusMode,
          ...action.payload,
          showAfter: updatedShowAfter,
        },
      };
    },
  },
});

export const selectPrevAppStateStatus = (state: RootState): AppStateStatus => state.appStateStatus.prevStatus;

export const selectCurrAppStateStatus = (state: RootState): AppStateStatus => state.appStateStatus.currStatus;

export const selectAppStateStatus = (state: RootState): PrevAndCurrStatus => state.appStateStatus;

export const selectServiceStatusMode = (state: RootState): ServiceStatusMode => state.appStateStatus.serviceStatusMode;

export const { setAppStateStatus, updateServiceStatusMode } = appStateStatusSlice.actions;

export default appStateStatusSlice.reducer;
