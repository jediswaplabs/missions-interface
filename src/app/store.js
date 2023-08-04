import { configureStore } from '@reduxjs/toolkit';

import walletReducer from '../features/wallet/walletSlice.ts';
import profileReducer from '../features/profile/profileSlice';
import { apiSlice } from '../features/api/apiSlice';

export default function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      profile: profileReducer,
      wallet: walletReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
    preloadedState,
  });
}
