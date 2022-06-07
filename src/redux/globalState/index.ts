import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLotteryId: null as any,
  historyLotteryData: null as any,
  loadinghistoryLotteryData: false,
  lastestLotteryId: null as any,
  lastestLotteryData: null as any,
  loadinglastestLotteryData: false,
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setCurrentLotteryId: (state, { payload }) => {
      state.currentLotteryId = payload;
    },
    setLastestLotteryId: (state, { payload }) => {
      state.lastestLotteryId = payload;
    },
    setHistoryLotteryData: (state, { payload }) => {
      state.historyLotteryData = payload;
    },
    setLastestLotteryData: (state, { payload }) => {
      state.lastestLotteryData = payload;
    },
    setLoadingHistoryLotteryData: (state, { payload }) => {
      state.loadinghistoryLotteryData = payload;
    },
    setLoadingLastestLotteryData: (state, { payload }) => {
      state.loadinghistoryLotteryData = payload;
    },
  },
});

export const {
  setCurrentLotteryId,
  setHistoryLotteryData,
  setLoadingHistoryLotteryData,
  setLastestLotteryData,
  setLoadingLastestLotteryData,
  setLastestLotteryId,
} = globalState.actions;

export default globalState.reducer;
