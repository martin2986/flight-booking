import apiClient from './apiClient';
import { type loginDataTypes, type registerDataTypes } from '../redux/auth/types';

export const login = async ({ loginData }: loginDataTypes) => {
  const response = await apiClient.post('/login', loginData);
  if (!response) throw new Error('Error logging  in, Please try again');
  const { data } = await response;

  return data;
};

export const register = async ({ registerData }: registerDataTypes) => {
  const response = await apiClient.post('/register', registerData);
  if (!response) throw new Error('Error Signing up, Please try again');
  const { data } = response;

  return data;
};
