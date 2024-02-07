import axios from 'axios';
import apiClient from './apiClient';
import { type loginTypes, type registerTypes } from '../redux/auth/actions';

export const login = async ({ loginData }: loginTypes) => {
  const response = await apiClient.post('/login', loginData);
  if (!response) throw new Error('Error logging  in, Please try again');
  const { data } = await response;

  return data;
};

export const register = async ({ registerData }: registerTypes) => {
  const response = await apiClient.post('/register', registerData);
  if (!response) throw new Error('Error Signing up, Please try again');
  const { data } = response;

  return data;
};
