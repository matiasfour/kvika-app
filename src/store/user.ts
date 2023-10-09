import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface User {
  ssn: string;
  name: string;
  email: string;
}

const initialState: User = {
  ssn: '',
  name: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { updateUser, logout } = userSlice.actions;

export const selectUserState = (state: RootState): User => state.user;

export default userSlice.reducer;
