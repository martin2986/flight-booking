import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface selectedFlightPayloadTypes {
  segments: any[];
  durationInMinutes: number;
  stopCount: number;
  price: {
    formatted: string;
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
  selectedReturnFlight: any;
  // tripMode: 'flights' | 'hotels';
}
const initialState: FlightState = {
  selectedFlight: {
    segments: [],
    durationInMinutes: 0,
    stopCount: 0,
    price: {
      formatted: '',
    },
    isSelected: false,
  },
  selectedReturnFlight: {
    segments: [],
    durationInMinutes: 0,
    stopCount: 0,
    price: {
      formatted: '',
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
};

const appSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    selectedFLight: (state, action: PayloadAction<selectedFlightPayloadTypes>) => {
      state.selectedFlight = action.payload;
    },
    setSelectedReturnFLight: (state, action: PayloadAction<any>) => {
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
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
