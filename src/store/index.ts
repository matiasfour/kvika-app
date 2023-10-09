import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appStateStatusReducer from './appStateStatus';
import userReducer from './user';
import portfolioReducer from './portfolio';
import userAccountReducer from './userAccount';
import ppidReducer from './ppid';
import transactionsReducer from './transactions';

const rootReducer = combineReducers({
  appStateStatus: appStateStatusReducer,
  userAccount: userAccountReducer,
  portfolio: portfolioReducer,
  user: userReducer,
  ppid: ppidReducer,
  transactions: transactionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // Only persist the information for PPID: Portfolio IDs and period.
  whitelist: ['ppid'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
