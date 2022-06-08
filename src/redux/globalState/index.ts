import { createSlice } from "@reduxjs/toolkit";
import { LotteryData } from "src/lib/hooks/useFetchContractInfo";
import { PersonalData } from "src/lib/hooks/useFetchPersonalInfo";

type InitialState<
  B = boolean,
  N = number,
  L = LotteryData,
  P = PersonalData
> = {
  isOpenPersonalTicketInfo: B;
  isOpenPersonalHistoryTicketInfo: B;
  currentLotteryId: N;
  historyLotteryData: L;
  loadinghistoryLotteryData: B;
  latestLotteryId: N;
  latestLotteryData: L;
  loadinglatestLotteryData: B;
  latestPersonalData: P;
  historyPersonalData: P;
  loadinghistoryPersonalData: B;
  numberOfWinningTickets: N;
};

const initialState: InitialState = {
  isOpenPersonalTicketInfo: false,
  isOpenPersonalHistoryTicketInfo: false,
  currentLotteryId: null as unknown as number,
  historyLotteryData: null as unknown as LotteryData,
  loadinghistoryLotteryData: false,
  latestLotteryId: null as unknown as number,
  latestLotteryData: null as unknown as LotteryData,
  loadinglatestLotteryData: false,
  latestPersonalData: null as unknown as PersonalData,
  historyPersonalData: null as unknown as PersonalData,
  loadinghistoryPersonalData: false,
  numberOfWinningTickets: 0,
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
    setNumberOfWinningTicket: (state, { payload }) => {
      state.numberOfWinningTickets = payload;
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
  setNumberOfWinningTicket,
} = globalState.actions;

export default globalState.reducer;
