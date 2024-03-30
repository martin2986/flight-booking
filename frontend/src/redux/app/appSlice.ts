import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface setFlightDataPayLoadTypes {
  itineraries: any[];
  token: string;
  context: {
    status: string;
    sessionId: string;
    totalResults: number;
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
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
