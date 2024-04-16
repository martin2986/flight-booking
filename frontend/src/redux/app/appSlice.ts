import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface setFlightDataPayLoadTypes {
  itineraries: any[];
  token: string;
  context: {
    status: string;
    sessionId: string;
    totalResults: number;
  };
  filterStats: {
    airports: { city: string }[];
  };
}

interface selectedFlightPayloadTypes {
  price: string;
  // date: string;
  originCode: string;
  destinationCode: string;
  origin: string;
  destination: string;
  durationInMinutes: number;
  stopCount: number;
  departureTime: string;
  originTime: string;
}
interface FlightState {
  flightData: setFlightDataPayLoadTypes;
  selectedFlight: selectedFlightPayloadTypes;
  toggleFlightDetail: boolean;
  departureDate: string;
  returnDate?: string;
  cabinClass: string;
  passengers: string;
  tripType: string;
  roundTrip: boolean;
  isLoading: boolean;
  adultCount: number;
  childrenCount: number;
  infantCount: number;
}
const initialState: FlightState = {
  flightData: {
    itineraries: [],
    token: '',
    context: {
      status: '',
      sessionId: '',
      totalResults: 0,
    },
    filterStats: {
      airports: [],
    },
  },
  selectedFlight: {
    price: '',
    originCode: '',
    destinationCode: '',
    origin: '',
    destination: '',
    durationInMinutes: 0,
    stopCount: 0,
    departureTime: '',
    originTime: '',
  },
  toggleFlightDetail: false,
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
    setFlightData: (state, action: PayloadAction<setFlightDataPayLoadTypes>) => {
      state.flightData = action.payload;
    },
    selectedFLight: (state, action: PayloadAction<selectedFlightPayloadTypes>) => {
      state.selectedFlight = action.payload;
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
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
