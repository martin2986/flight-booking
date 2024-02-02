import axios from 'axios';
import { type loginTypes, type registerTypes } from '../redux/auth/actions';

export const login = async ({ loginData }: loginTypes) => {
  const response = await axios.post(`/api/login`, loginData);
  if (!response) throw new Error('Error logging  in, Please try again');
  const { data } = await response;

  return data;
};

export const register = async ({ registerData }: registerTypes) => {
  const response = await axios.post(`/api/register`, registerData);
  if (!response) throw new Error('Error Signing up, Please try again');
  const { data } = response;

  return data;
};

export const logout = async () => {
  try {
    const response = await axios.get(`/api/logout`);
    if (!response) throw new Error('Error logging out, Please try again');
    const { data } = response;

    return data;
  } catch (err) {
    console.error('Logout error', err);
  }
};
