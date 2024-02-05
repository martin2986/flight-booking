import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
