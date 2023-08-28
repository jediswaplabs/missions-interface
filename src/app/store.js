import { configureStore } from '@reduxjs/toolkit';

import walletReducer from '../features/wallet/walletSlice.ts';
import profileReducer from '../pages/ProfilePage/profileSlice';
import questReducer from '../pages/QuestPage/questSlice';

export default function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      profile: profileReducer,
      wallet: walletReducer,
      quest: questReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState,
  });
}
