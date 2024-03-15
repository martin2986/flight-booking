import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();
export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH}`,
  withCredentials: true,
});
export const appApi = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API}`,
  withCredentials: true,
});

export const flightClient = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_BASE_URL}`,
  withCredentials: true,
  headers: {
    'X-Access-Token': import.meta.env.VITE_AVIA_SALES,
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_HOST,
  },
});
export const cityClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_SERVER}`,
  withCredentials: true,
  headers: {
    'X-Access-Token': import.meta.env.VITE_AVIA_SALES,
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_HOST,
  },
});
