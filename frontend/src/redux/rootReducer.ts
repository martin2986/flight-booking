import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { reducer as authReducer } from './auth';
import storage from 'redux-persist/lib/storage';
const rootReducer = combineReducers({
  auth: authReducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
