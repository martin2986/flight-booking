import axios from 'axios';
import { type loginTypes, type registerTypes } from '../redux/auth/actions';

export const login = async ({ loginData }: loginTypes) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}login`, loginData);
  if (!response) throw new Error('Error logging  in, Please try again');
  const { data } = await response;

  return data;
};

export const register = async ({ registerData }: registerTypes) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}register`, registerData);
  if (!response) throw new Error('Error Signing up, Please try again');
  const { data } = response;

  return data;
};
