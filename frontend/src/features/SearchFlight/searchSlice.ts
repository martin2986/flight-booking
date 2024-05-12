import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  adultCount: 1,
  childrenCount: 0,
  infantCount: 0,
  departureDate: '',
  returnDate: '',
  passengers: 1,
  roundTrip: true,
  cabinClass: '',
  origin: '',
  destination: '',
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    selectDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    selectArrivalDate: (state, action) => {
      state.returnDate = action.payload;
    },
    selectCabinClass: (state, action) => {
      state.cabinClass = action.payload;
    },
    selectTripType: (state, action) => {
      state.roundTrip = action.payload;
    },
    incrementAdult: (state) => {
      state.adultCount++;
      state.passengers = state.adultCount + state.childrenCount + state.infantCount;
    },
    decrementAdult: (state) => {
      state.adultCount--;
      state.passengers = state.adultCount + state.childrenCount + state.infantCount;
    },
    incrementChildren: (state) => {
      state.childrenCount++;
      state.passengers = state.adultCount + state.childrenCount + state.infantCount;
    },
    decrementChildren: (state) => {
      state.childrenCount--;
      state.passengers = state.adultCount + state.childrenCount + state.infantCount;
    },
    incrementInfant: (state) => {
      state.infantCount++;
      state.passengers = state.adultCount + state.childrenCount + state.infantCount;
    },
    decrementInfant: (state) => {
      state.infantCount--;
      state.passengers = state.adultCount + state.childrenCount + state.infantCount;
    },
  },
});
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
