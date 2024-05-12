import { Dispatch } from 'redux';
import { authApi, userApi } from '../../services/auth/apiClient';
import { authAction } from './authSlice';
export type loginTypes = {
  email: string;
  password: string;
};
export type registerTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};
export type updateMeTypes = {
  email: string;
  name: string;
};
export const login = (loginData: loginTypes) => async (dispatch: Dispatch<any>) => {
  const response = await authApi.post('/login', loginData);
  if (!response) throw new Error('Error logging  in, Please try again');
  const { data } = response;
  if (data.success === true) {
    dispatch(authAction.login(data.result));
  }
};
export const register = (registerData: registerTypes) => async (dispatch: Dispatch<any>) => {
  const response = await authApi.post('/register', registerData);
  if (!response) throw new Error('Error Signing up, Please try again');
  const { data } = response;
  if (data.success === true) {
    dispatch(authAction.signUp(data.result));
  }
};
export const logout = () => async (dispatch: Dispatch<any>) => {
  try {
    const response = await userApi.get('/logout');
    if (!response) throw new Error('Ops there seems to be an error, Please try again');
    const { data } = response;
    if (data.success === true) {
      dispatch(authAction.logout());
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const updateMe = (updateMeData: updateMeTypes) => async (dispatch: Dispatch<any>) => {
  const response = await userApi.patch('/updateMe', updateMeData);
  if (!response) throw new Error('Error updating details, Please try again');
  const { data } = response;
  if (data.success === true) {
    dispatch(authAction.updateMe(data.result));
  }
};
