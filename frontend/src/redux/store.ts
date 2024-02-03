import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';
import persistStore from 'redux-persist/es/persistStore';

const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState: AUTH_INITIAL_STATE,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
