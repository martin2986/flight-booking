import * as actionTypes from './types';
import { PayloadAction } from '@reduxjs/toolkit';
const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  user: {},
};

type PayLoadTypes = {
  current: {};
  user: {};
};

const authReducer = (
  state: typeof INITIAL_STATE = INITIAL_STATE,
  action: PayloadAction<PayLoadTypes>,
) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;

    case actionTypes.REGISTER_SUCCESS:
      return {
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        current: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        current: action.payload.current,
        user: action.payload.user,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
