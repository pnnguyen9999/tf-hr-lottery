import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenPersonalTicketInfo: false,
  isOpenPersonalHistoryTicketInfo: false,
  currentLotteryId: null as any,
  historyLotteryData: null as any,
  loadinghistoryLotteryData: false,
  latestLotteryId: null as any,
  latestLotteryData: null as any,
  loadinglatestLotteryData: false,
  latestPersonalData: null as any,
  historyPersonalData: null as any,
  loadinghistoryPersonalData: false,
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setlatestLotteryId: (state, { payload }) => {
      state.latestLotteryId = payload;
    },
    setCurrentLotteryId: (state, { payload }) => {
      state.currentLotteryId = payload;
    },
    setHistoryLotteryData: (state, { payload }) => {
      state.historyLotteryData = payload;
    },
    setlatestLotteryData: (state, { payload }) => {
      state.latestLotteryData = payload;
    },
    setlatestPersonalData: (state, { payload }) => {
      state.latestPersonalData = payload;
    },
    setHistoryPersonalData: (state, { payload }) => {
      state.historyPersonalData = payload;
    },
    setLoadingPersonalLotteryData: (state, { payload }) => {
      state.loadinghistoryPersonalData = payload;
    },
    setLoadingHistoryLotteryData: (state, { payload }) => {
      state.loadinghistoryLotteryData = payload;
    },
    setLoadinglatestLotteryData: (state, { payload }) => {
      state.loadinghistoryLotteryData = payload;
    },
    setOpenPersonalTicketInfo: (state, { payload }) => {
      state.isOpenPersonalTicketInfo = payload;
    },
    setOpenHistoryPersonalTicketInfo: (state, { payload }) => {
      state.isOpenPersonalHistoryTicketInfo = payload;
    },
  },
});

export const {
  setCurrentLotteryId,
  setHistoryLotteryData,
  setLoadingHistoryLotteryData,
  setlatestLotteryData,
  setLoadinglatestLotteryData,
  setlatestLotteryId,
  setlatestPersonalData,
  setOpenPersonalTicketInfo,
  setHistoryPersonalData,
  setOpenHistoryPersonalTicketInfo,
} = globalState.actions;

export default globalState.reducer;
