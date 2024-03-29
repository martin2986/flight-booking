import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayLoadTypes {
  itineraries: any[];
  token: string;
  context: {
    status: string;
    sessionId: string;
    totalResults: number;
  };
}

interface FlightState {
  flightData: PayLoadTypes;
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
};

const appSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlightData: (state, action: PayloadAction<PayLoadTypes>) => {
      state.flightData = action.payload;
    },
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
