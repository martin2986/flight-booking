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
  date: string;
  originCode: string;
  destinationCode: string;
  origin: string;
  destination: string;
}
interface FlightState {
  flightData: setFlightDataPayLoadTypes;
  selectedFlight: selectedFlightPayloadTypes;
  toggleFlightDetail: boolean;
  departureDate: string;
  date: { id: string; date: Date };
  returnDate?: string;
  cabinClass: string;
  passengers: string;
  tripType: string;
  roundTrip: boolean;
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
    date: '',
    originCode: '',
    destinationCode: '',
    origin: '',
    destination: '',
  },
  toggleFlightDetail: false,
  departureDate: '',
  returnDate: '',
  cabinClass: '',
  passengers: '',
  tripType: '',
  roundTrip: true,
  date: {
    id: '',
    date: new Date(),
  },
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
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
