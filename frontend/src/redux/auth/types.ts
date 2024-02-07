export const FAILED_REQUEST = 'AUTH_FAILED_REQUEST';
// export const LOADING_REQUEST = 'AUTH_LOADING_REQUEST';

export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const REQUEST_LOADING = 'AUTH_REQUEST_LOADING';
export const REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const REQUEST_FAILED = 'AUTH_REQUEST_FAILED';

export type loginTypes = {
  email: string;
  password: string;
};

export type registerTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type loginDataTypes = {
  loginData: loginTypes;
};
export type registerDataTypes = {
  registerData: registerTypes;
};

export type INITIAL_STATE_TYPES = {
  current: {};
  isLoggedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  user: {};
};

export interface UserDetails {
  // Define the structure of user details
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  current: UserDetails | null;
  user: UserDetails | null;
}

export type RequestLoadingAction = {
  type: 'REQUEST_LOADING';
};
type RequestSuccessAction = {
  type: 'REQUEST_SUCCESS';
};
type RequestFailedAction = {
  type: 'REQUEST_FAILED';
};
type LoginSuccessAction = {
  type: 'LOGIN_SUCCESS';
  payload: AuthState;
};
type RegisterSuccessAction = {
  type: 'REGISTER_SUCCESS';
  payload: AuthState;
};
export type LogoutAction = {
  type: 'LOGOUT_SUCCESS';
};

export type RegisterAuthType =
  | RequestLoadingAction
  | RequestSuccessAction
  | RequestFailedAction
  | RegisterSuccessAction;

export type LoginAuthActionTypes =
  | LoginSuccessAction
  | RequestFailedAction
  | RequestSuccessAction
  | RequestLoadingAction;

export type LogoutActionTypes = LogoutAction | RequestLoadingAction;
