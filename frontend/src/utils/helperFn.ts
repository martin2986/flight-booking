import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';
import { segment } from '../features/Flight/types';
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

export const formatTime = (data: string | null) => {
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
  const fullDateWithDay = moment(data).format('ddd, MMMM Do YYYY');
  return {
    formattedDateShort,
    formattedTime,
    formattedFullDate,
    fullDateWithDay,
  };
};
export const modifiedAirlineName = (data: string) => {
  const cleanedData = data.replace('Airways', '').replace('(UK)', '').replace('Airlines', '');
  return cleanedData;
};

export function getYear() {
  const yearsFrom1950To2024 = [];
  for (let year = 1950; year <= 2024; year++) {
    yearsFrom1950To2024.push(year);
  }
  return yearsFrom1950To2024;
}
export const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const numbersFrom1To31 = Array.from({ length: 31 }, (_, index) => index + 1);

export const filterList = (data: segment[]) => {
  if (data.length <= 1) {
    return data;
  }
  const {
    origin: firstOrigin,
    departure: firstDeparture,
    flightNumber: firstFlightNumber,
  } = data[0];
  const { arrival: lastArrival, destination: lastDestination } = data[data.length - 1];
  const modifiedFirstSegment = {
    origin: firstOrigin,
    arrival: lastArrival,
    destination: lastDestination,
    departure: firstDeparture,
    flightNumber: firstFlightNumber,
  };
  return [modifiedFirstSegment] as segment[];
};
