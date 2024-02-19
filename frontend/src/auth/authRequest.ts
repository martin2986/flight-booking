import { appApi, authApi } from './apiClient';
import { type loginTypes, type registerTypes, type updateMeTypes } from '../redux/auth/types';

interface loginDataTypes {
  loginData: loginTypes;
}
interface registerDataTypes {
  registerData: registerTypes;
}
interface updateMeDataTypes {
  updateMeData: updateMeTypes;
}
export const login = async ({ loginData }: loginDataTypes) => {
  const response = await authApi.post('/login', loginData);
  if (!response) throw new Error('Error logging  in, Please try again');
  const { data } = await response;

  return data;
};

export const register = async ({ registerData }: registerDataTypes) => {
  const response = await authApi.post('/register', registerData);
  if (!response) throw new Error('Error Signing up, Please try again');
  const { data } = response;

  return data;
};

export const updateMe = async ({ updateMeData }: updateMeDataTypes) => {
  const response = await appApi.patch('/updateMe', updateMeData);
  if (!response) throw new Error('Error updating details, Please try again');
  const { data } = await response;

  return data;
};
