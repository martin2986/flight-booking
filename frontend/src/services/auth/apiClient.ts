import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

export const authApi = axios.create({
  baseURL: 'https://flyeasy-server.fadairomartins.com/api/v1/auth',
  withCredentials: true,
});
export const appApi = axios.create({
  baseURL: 'https://flyeasy-server.fadairomartins.com/api/v1/users',
  withCredentials: true,
});
export const flightClient = axios.create({
  baseURL: `${process.env.SECRET_HOST_BASE_URL}`,
  withCredentials: true,
  headers: {
    'X-RapidAPI-Key': process.env.SECRET_API_KEY,
    'X-RapidAPI-Host': process.env.SECRET_HOST,
  },
});
