import { InvestmentUserResponseSchema } from '@kvika/api-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { logout } from './user';

type userAccountState = {
  availableUserAccounts: InvestmentUserResponseSchema[];
  selectedUserAccount?: InvestmentUserResponseSchema;
};

const initialState: userAccountState = {
  availableUserAccounts: [],
  selectedUserAccount: undefined,
};

export const userSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    updateSelectedUserAccount: (state, action: PayloadAction<InvestmentUserResponseSchema>) => {
      return {
        ...state,
        selectedUserAccount: action.payload,
      };
    },
    updateAvailableUserAccounts: (state, action: PayloadAction<InvestmentUserResponseSchema[]>) => {
      return {
        ...state,
        availableUserAccounts: action.payload,
      };
    },
    clearUserAccounts() {
      return initialState;
    },
  },
  extraReducers: (builder) => builder.addCase(logout, () => initialState),
});

export const { updateSelectedUserAccount, updateAvailableUserAccounts, clearUserAccounts } = userSlice.actions;

export const selectAvailableUserAccounts = (state: RootState): InvestmentUserResponseSchema[] =>
  state.userAccount.availableUserAccounts;
export const selectSelectedUserAccount = (state: RootState): InvestmentUserResponseSchema | undefined =>
  state.userAccount.selectedUserAccount;

export default userSlice.reducer;
