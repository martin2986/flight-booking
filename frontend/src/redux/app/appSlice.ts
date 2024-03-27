import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  flightData: {},
};

type PayLoadTypes = {
  flightData: {};
};

const appSlice = createSlice({
  name: 'flight',
  initialState: INITIAL_STATE,
  reducers: {
    setFlightData: (state, action: PayloadAction<PayLoadTypes>) => {
      state.flightData = action.payload;
    },
  },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
