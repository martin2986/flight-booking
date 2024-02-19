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
export type updateMeTypes = {
  email: string;
  name: string;
};

export type registerTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type INITIAL_STATE_TYPES = {
  current: {};
  isLoggedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  user: {};
};

interface RequestLoadingAction {
  type: typeof REQUEST_LOADING;
}
interface RequestSuccessAction {
  type: typeof REQUEST_SUCCESS;
}
interface RequestFailedAction {
  type: typeof REQUEST_FAILED;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}
interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: any;
}
export interface LogoutAction {
  type: typeof LOGOUT_SUCCESS;
}

export type ReducerActionTypes =
  | RequestLoadingAction
  | RequestSuccessAction
  | RequestFailedAction
  | LoginSuccessAction
  | RegisterSuccessAction;

export type RegisterAuthActionType =
  | RequestLoadingAction
  | RequestSuccessAction
  | RequestFailedAction
  | RegisterSuccessAction;

export type LoginAuthActionTypes =
  | LoginSuccessAction
  | RequestFailedAction
  | RequestSuccessAction
  | RequestLoadingAction;

type AuthPropsTypes =
  | LoginSuccessAction
  | RequestFailedAction
  | RequestSuccessAction
  | RequestLoadingAction;
interface updateActionTypes extends AuthPropsTypes {}
export type LogoutActionTypes = LogoutAction | RequestLoadingAction;
