import * as actionTypes from './types';
const INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  token: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        token: action.payload,
        current: action.payload,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;

    case actionTypes.REGISTER_SUCCESS:
      return {
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        current: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        current: action.payload.current,
        token: action.payload.token,
      };
    // case actionTypes.
    default:
      return state;
  }
};

export default authReducer;
