import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
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
