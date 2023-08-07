import { configureStore } from '@reduxjs/toolkit';

import walletReducer from '../features/wallet/walletSlice.ts';
import profileReducer from '../features/profile/profileSlice';
import questReducer from '../pages/QuestPage/questSlice';
import { apiSlice } from '../features/api/apiSlice';

export default function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      profile: profileReducer,
      wallet: walletReducer,
      quest: questReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
    preloadedState,
  });
}
