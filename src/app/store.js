import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../features/api/apiSlice';
import { questsSlice } from '../features/quests/questsSlice';

export default function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      quests: questsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
    preloadedState,
  });
}
