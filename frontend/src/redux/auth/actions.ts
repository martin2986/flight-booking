import { Dispatch } from 'redux';
import * as actionTypes from './types';
import * as authService from '../../auth/authRequest';
import { type ActionTypes } from './types';
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
      dispatch({ type: actionTypes.REGISTER_SUCCESS });
    } else {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
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
interface RequestLoadingAction {
  type: ActionTypes['REQUEST_LOADING'];
}
interface RequestSuccessAction {
  type: ActionTypes['REQUEST_SUCCESS'];
  payload: PayLoadData;
}
interface RequestFailedAction {
  type: ActionTypes['REQUEST_FAILED'];
}
interface LoginSuccessAction {
  type: ActionTypes['LOGIN_SUCCESS'];
}
interface RegisterSuccessAction {
  type: ActionTypes['REGISTER_SUCCESS'];
}
export type loginTypes = {
  loginData: {
    email: string;
    password: string;
  };
};
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
