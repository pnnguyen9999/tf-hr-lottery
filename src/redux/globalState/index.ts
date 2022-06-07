import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLotteryId: null as any,
  selectedLotteryData: null as any,
  loadingSelectedLotteryData: false,
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setCurrentLotteryId: (state, { payload }) => {
      state.currentLotteryId = payload;
    },
    setSelectedLotteryData: (state, { payload }) => {
      state.selectedLotteryData = payload;
    },
    setLoadingSelectedLotteryData: (state, { payload }) => {
      state.loadingSelectedLotteryData = payload;
    },
  },
});

export const {
  setCurrentLotteryId,
  setSelectedLotteryData,
  setLoadingSelectedLotteryData,
} = globalState.actions;

export default globalState.reducer;
