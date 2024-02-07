import { Dispatch } from 'redux';
import * as actionTypes from './types';
import * as authService from '../../auth/authRequest';
import axios from 'axios';

type loginTypes = {
  loginData: {
    email: string;
    password: string;
  };
};

export type loginPayLoad = {
  current: {};
  isLoggedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
export type PayLoadData = {
  data: {
    result: {
      _id: string;
      name: string;
      email: string;
    };
  };
};
export const login =
  ({ loginData }: loginTypes) =>
  async (dispatch: Dispatch<LoginAuthActionTypes>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const data = await authService.login({ loginData });

    if (data.success === true) {
      const authState = {
        current: data,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        user: data.result,
      };
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: authState });
    } else {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
  };

export const register =
  ({ registerData }: registerTypes) =>
  async (dispatch: Dispatch<RegisterAuthType>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const data = await authService.register({ registerData });

    if (data.success === true) {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data });
    } else {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
  };

export const logout = () => {
  return async (dispatch: Dispatch<LogoutActionTypes>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const fetchLogout = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API}logout`);
      if (!response) throw new Error('Ops there seems to be an error, Please try again');
      const { data } = response;
      if (data.success === true) {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
      }
      console.log('data response', data);
      return data;
    };

    try {
      await fetchLogout();
    } catch (err) {
      console.error('error', err);
    }
  };
};

interface RequestLoadingAction {
  type: typeof actionTypes.REQUEST_LOADING;
}
interface RequestSuccessAction {
  type: typeof actionTypes.REQUEST_SUCCESS;
}
interface RequestFailedAction {
  type: typeof actionTypes.REQUEST_FAILED;
}
interface LoginSuccessAction {
  type: typeof actionTypes.LOGIN_SUCCESS;
  payload: loginPayLoad;
}
interface RegisterSuccessAction {
  type: typeof actionTypes.REGISTER_SUCCESS;
  payload: PayLoadData;
}
export interface LogoutAction {
  type: typeof actionTypes.LOGOUT_SUCCESS;
}

export type registerTypes = {
  registerData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
};

export type RegisterAuthType =
  | RequestLoadingAction
  | RequestSuccessAction
  | RequestFailedAction
  | RegisterSuccessAction;

export type LoginAuthActionTypes =
  | LoginSuccessAction
  | RequestFailedAction
  | RequestSuccessAction
  | RequestLoadingAction;

export type LogoutActionTypes = LogoutAction | RequestLoadingAction;
