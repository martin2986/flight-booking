import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { segment } from '../../components/FlightSchedule/types';
interface selectedFlightPayloadTypes {
  segments: segment[];
  durationInMinutes: number;
  stopCount: number;
  price: {
    formatted: string;
    raw: number;
  };
  isSelected: boolean;
}
interface FlightState {
  selectedFlight: selectedFlightPayloadTypes;
  toggleFlightDetail: boolean;
  departureDate: string;
  returnDate: string;
  cabinClass: string;
  passengers: string;
  tripType: string;
  roundTrip: boolean;
  isLoading: boolean;
  adultCount: number;
  childrenCount: number;
  infantCount: number;
  origin: string;
  destination: string;
  selectedReturnFlight: selectedFlightPayloadTypes;
  totalAmount: number;
  extraLuggage: number;
  protectedInsurance: number;
}

const initialState: FlightState = {
  selectedFlight: {
    segments: [
      {
        origin: {
          displayCode: '',
          name: '',
          city: '',
        },
        destination: {
          displayCode: '',
          name: '',
          city: '',
        },
        departure: '',
        arrival: '',
        durationInMinutes: 0,
        operatingCarrier: '',
        flightNumber: 0,
      },
    ],
    durationInMinutes: 0,
    stopCount: 0,
    price: {
      formatted: '',
      raw: 0,
    },
    isSelected: false,
  },
  selectedReturnFlight: {
    segments: [
      {
        origin: {
          displayCode: '',
          name: '',
          city: '',
        },
        destination: {
          displayCode: '',
          name: '',
          city: '',
        },
        departure: '',
        arrival: '',
        durationInMinutes: 0,
        operatingCarrier: '',
        flightNumber: 0,
      },
    ],
    durationInMinutes: 0,
    stopCount: 0,
    price: {
      formatted: '',
      raw: 0,
    },
    isSelected: false,
  },
  toggleFlightDetail: false,
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  cabinClass: '',
  passengers: '',
  tripType: '',
  roundTrip: true,
  isLoading: false,
  adultCount: 1,
  childrenCount: 0,
  infantCount: 0,
  extraLuggage: 0,
  protectedInsurance: 0,
  totalAmount: 0,
};
const extraLuggagePrice = 60.02;
const protectedInsurancePrice = 27.48;
const appSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    selectedFLight: (state, action: PayloadAction<selectedFlightPayloadTypes>) => {
      state.selectedFlight = action.payload;
    },
    setSelectedReturnFLight: (state, action: PayloadAction<selectedFlightPayloadTypes>) => {
      state.selectedReturnFlight = action.payload;
    },
    toggleFlightDetail: (state, action: PayloadAction<boolean>) => {
      state.toggleFlightDetail = action.payload;
    },
    selectDepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    selectArrivalDate: (state, action) => {
      state.returnDate = action.payload;
    },
    selectPassenger: (state, action) => {
      state.passengers = action.payload;
    },
    selectCabinClass: (state, action) => {
      state.cabinClass = action.payload;
    },
    selectTripType: (state, action) => {
      state.roundTrip = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    incrementAdult: (state) => {
      state.adultCount++;
    },
    decrementAdult: (state) => {
      state.adultCount--;
    },
    incrementChildren: (state) => {
      state.childrenCount++;
    },
    decrementChildren: (state) => {
      state.childrenCount--;
    },
    incrementInfant: (state) => {
      state.infantCount++;
    },
    decrementInfant: (state) => {
      state.infantCount--;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    clearSelectedFlight: (state) => {
      state.selectedFlight = initialState.selectedFlight;
      state.selectedReturnFlight = initialState.selectedReturnFlight;
    },
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
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
