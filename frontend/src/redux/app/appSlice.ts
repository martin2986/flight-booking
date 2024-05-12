import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { segment } from '../../features/Flight/types';
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
  isLoading: boolean;
  selectedReturnFlight: selectedFlightPayloadTypes;
  totalAmount: number;
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
  isLoading: false,
  totalAmount: 0,
};

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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearSelectedFlight: (state) => {
      state.selectedFlight = initialState.selectedFlight;
      state.selectedReturnFlight = initialState.selectedReturnFlight;
    },
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
