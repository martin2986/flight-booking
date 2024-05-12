import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  extraLuggage: 0,
  protectedInsurance: 0,
  checkoutUser: [],
};
const extraLuggagePrice = 60.02;
const protectedInsurancePrice = 27.48;
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addExtraLuggage: (state) => {
      state.extraLuggage += extraLuggagePrice;
    },
    addProtectedInsurance: (state) => {
      state.protectedInsurance += protectedInsurancePrice;
    },
    removeExtraLuggage: (state) => {
      state.extraLuggage -= extraLuggagePrice;
    },
    removeExtraInsurance: (state) => {
      state.protectedInsurance -= protectedInsurancePrice;
    },
    setCheckoutUser: (state, action) => {
      state.checkoutUser = action.payload;
    },
  },
});

export const checkoutAction = checkoutSlice.actions;
export default checkoutSlice.reducer;
