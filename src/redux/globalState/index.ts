import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lotteryNumberArray: null,
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {},
});

export const {} = globalState.actions;

export default globalState.reducer;
