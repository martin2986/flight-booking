import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';
declare global {
  interface Array<T> {
    capitalizeFirstLetter(): T | null;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function cns(...classes: []) {
  return classes.filter(Boolean).join(' ');
}

export const selectTrip = ['Round Trip', 'One way'];
export const selectFlightType = ['Economy', 'Premium', 'Business', 'First Class'];
export const selectPassenger = ['Passenger', 1, 2, 3, 4, 5, 6];

export const durationInHour = (data: number) => {
  const duration = moment.duration(data, 'minutes');
  const hours = Math.floor(duration.asHours());
  const mins = Math.floor(duration.asMinutes()) % 60;
  return `${hours}hr ${mins}min`;
};

export const formatTime = (data: string) => {
  if (!data) return;
  const formattedDateShort = moment(data).format('DD MMM');
  const formattedDate = moment(data).format('YYYY-MM-DD');
  const formattedFullDate = moment(data).format('DD MMM YYYY');
  const fullDateWithDay = moment(data).format('ddd, MMMM Do YYYY');
  return { formattedDate, formattedFullDate, fullDateWithDay, formattedDateShort };
};

export const formattedDate = (data: string) => {
  const [date, time] = data?.split('T');
  const formattedTime = moment(time, 'HH:mm:ss').format('HH:mm');
  const formattedDateShort = moment(date).format('DD MMM');
  const formattedFullDate = moment(data).format('DD MMM YYYY');
  return {
    formattedDateShort,
    formattedTime,
    formattedFullDate,
  };
};
export const modifiedAirlineName = (data: string) => {
  const cleanedData = data.replace('Airways', '').replace('(UK)', '').replace('Airlines', '');
  return cleanedData;
};
