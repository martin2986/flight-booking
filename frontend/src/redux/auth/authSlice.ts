import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type PayLoadTypes = {
  name: string;
  email: string;
};
const INITIAL_STATE = {
  isSuccess: false,
  isLoggedIn: false,
  user: {
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login(state, action: PayloadAction<PayLoadTypes>) {
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    signUp(state, action: PayloadAction<PayLoadTypes>) {
      state.isSuccess = true;
      state.isLoggedIn = false;
      state.user = action.payload;
    },
    logout(state) {
      state.isSuccess = true;
      state.isLoggedIn = false;
      state.user = {
        name: '',
        email: '',
      };
    },
    updateMe(state, action: PayloadAction<PayLoadTypes>) {
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.user = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
