import { Dispatch } from 'redux';
import { appApi, authApi } from '../../auth/apiClient';
import * as authService from '../../auth/authRequest';
import * as actionTypes from './types';
interface loginDataTypes {
  loginData: actionTypes.loginTypes;
}
interface registerDataTypes {
  registerData: actionTypes.registerTypes;
}

// interface updateDataProps {}
interface updateMeDataTypes {
  updateMeData: actionTypes.updateMeTypes;
}

export const login =
  ({ loginData }: loginDataTypes) =>
  async (dispatch: Dispatch<actionTypes.LoginAuthActionTypes>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const data = await authService.login({ loginData });
    console.log(data);

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
  ({ registerData }: registerDataTypes) =>
  async (dispatch: Dispatch<actionTypes.RegisterAuthActionType>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const data = await authService.register({ registerData });

    if (data.success === true) {
      const authState = {
        current: data,
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        user: data.result,
      };
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: authState });
    } else {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
  };

export const logout = () => {
  return async (dispatch: Dispatch<actionTypes.LogoutActionTypes>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const fetchLogout = async () => {
      const response = await authApi.get('/logout');
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
export const updateMe = ({ updateMeData }: updateMeDataTypes) => {
  return async (dispatch: Dispatch<T>) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const data = await authService.updateMe({ updateMeData });
    console.log(data);
    if (data.success === true) {
      dispatch({ type: actionTypes.REQUEST_SUCCESS });
    } else {
      dispatch({ type: actionTypes.REQUEST_FAILED });
    }
  };
};
