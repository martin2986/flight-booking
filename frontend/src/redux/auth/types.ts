export type ActionTypes = {
  REQUEST_LOADING: string;
  REQUEST_SUCCESS: string;
  REQUEST_FAILED: string;
  LOGIN_SUCCESS: string;
  REGISTER_SUCCESS: string;
  FAILED_REQUEST: string;
  LOADING_REQUEST: string;
  LOGOUT_SUCCESS: string;
};

export const FAILED_REQUEST = 'AUTH_FAILED_REQUEST';
export const LOADING_REQUEST = 'AUTH_LOADING_REQUEST';

export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REQUEST_LOADING = 'AUTH_REQUEST_LOADING';
export const REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const REQUEST_FAILED = 'AUTH_REQUEST_FAILED';
