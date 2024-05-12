import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import authReducer from './auth/authSlice';
import appReducer from './app/appSlice';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const rootReducer = combineReducers({
  auth: persistedReducer,
  app: appReducer,
});

export default rootReducer;
