import { createSlice } from "@reduxjs/toolkit";
import { LotteryData } from "src/lib/hooks/useFetchContractInfo";
import { PersonalData } from "src/lib/hooks/useFetchPersonalInfo";

export type StatusPopup = {
  isOpen: boolean;
  type: "success" | "fail";
  message: string;
};
type InitialState<
  B = boolean,
  N = number,
  L = LotteryData,
  P = PersonalData,
  A = []
> = {
  isOpenPopupStatus: StatusPopup;
  isOpenPopupBuyTicket: boolean;
  isOpenPersonalTicketInfo: B;
  isOpenPersonalHistoryTicketInfo: B;
  isOpenLoadingPopup: B;
  currentLotteryId: N;
  historyLotteryData: L;
  loadinghistoryLotteryData: B;
  latestLotteryId: N;
  latestLotteryData: L;
  loadinglatestLotteryData: B;
  latestPersonalData: P;
  historyPersonalData: P;
  loadinghistoryPersonalData: B;
  numberOfWinningTickets: A;
  maxAmountCanBuy: N;
  isOnCalculatingTime: B;
};

const initialState: InitialState = {
  isOpenPersonalTicketInfo: false,
  isOpenPersonalHistoryTicketInfo: false,
  isOpenLoadingPopup: false,
  currentLotteryId: null as unknown as number,
  historyLotteryData: null as unknown as LotteryData,
  loadinghistoryLotteryData: false,
  latestLotteryId: null as unknown as number,
  latestLotteryData: null as unknown as LotteryData,
  loadinglatestLotteryData: false,
  latestPersonalData: null as unknown as PersonalData,
  historyPersonalData: null as unknown as PersonalData,
  loadinghistoryPersonalData: false,
  numberOfWinningTickets: [],
  isOpenPopupStatus: {
    isOpen: false,
    type: "fail",
    message: "",
  },
  maxAmountCanBuy: 0,
  isOpenPopupBuyTicket: false,
  isOnCalculatingTime: false,
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
    setOpenPopupStatus: (state, { payload }: { payload: StatusPopup }) => {
      state.isOpenPopupStatus = {
        isOpen: payload.isOpen,
        type: payload.type,
        message: payload.message,
      };
    },
    setMaxAmountCanBuy: (state, { payload }) => {
      state.maxAmountCanBuy = payload;
    },
    setOpenPopupBuyTicket: (state, { payload }) => {
      state.isOpenPopupBuyTicket = payload;
    },
    setOnCalculatingTime: (state, { payload }) => {
      state.isOnCalculatingTime = payload;
    },
    setOpenLoadingPopup: (state, { payload }) => {
      state.isOpenLoadingPopup = payload;
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
  setOpenPopupStatus,
  setMaxAmountCanBuy,
  setOpenPopupBuyTicket,
  setOnCalculatingTime,
  setOpenLoadingPopup,
} = globalState.actions;

export default globalState.reducer;
