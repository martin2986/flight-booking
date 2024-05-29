import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  extraLuggage: 0,
  protectedInsurance: 0,
  totalCheckoutAmount: 0,
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
      state.totalCheckoutAmount = state.extraLuggage + state.protectedInsurance;
    },
    addProtectedInsurance: (state) => {
      state.protectedInsurance += protectedInsurancePrice;
      state.totalCheckoutAmount = state.extraLuggage + state.protectedInsurance;
    },
    removeExtraLuggage: (state) => {
      state.extraLuggage -= extraLuggagePrice;
      state.totalCheckoutAmount = state.extraLuggage + state.protectedInsurance;
    },
    removeExtraInsurance: (state) => {
      state.protectedInsurance -= protectedInsurancePrice;
      state.totalCheckoutAmount = state.extraLuggage + state.protectedInsurance;
    },
    setCheckoutUser: (state, action) => {
      state.checkoutUser = action.payload;
    },
  },
});

export const checkoutAction = checkoutSlice.actions;
export default checkoutSlice.reducer;
