import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore } from 'redux-persist';
export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
