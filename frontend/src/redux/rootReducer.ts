import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import authReducer from './auth/authSlice';
import appReducer from './app/appSlice';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
