import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  withCredentials: true,
});

export const flightClient = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_URL}`,
  withCredentials: true,
  headers: {
    'X-Access-Token': import.meta.env.VITE_AVIA_SALES,
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_HOST,
  },
});
