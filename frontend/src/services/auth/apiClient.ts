import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();
export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_SECRET_AUTH}`,
  withCredentials: true,
});
export const appApi = axios.create({
  baseURL: `${import.meta.env.VITE_SECRET_API}`,
  withCredentials: true,
});
export const flightClient = axios.create({
  baseURL: `${import.meta.env.VITE_SECRET_HOST_BASE_URL}`,
  withCredentials: true,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_SECRET_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_SECRET_HOST,
  },
});
