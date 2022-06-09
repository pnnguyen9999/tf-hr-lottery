import { TicketWithReward } from "@components/HomePage/ProcessDataCpn";
import { createSlice } from "@reduxjs/toolkit";
import { RewardInfo } from "src/lib/hooks/useFetchRewardInfo";

const initialState = {
  isOpenPopupReward: false,
  totalRewardRx: {
    hegemReward: 0,
    heraReward: 0,
  } as RewardInfo,
  allTicketsRewardRx: [] as unknown as TicketWithReward[],
};

const rewardState = createSlice({
  name: "rewardState",
  initialState,
  reducers: {
    setOpenPopupReward: (state, { payload }) => {
      state.isOpenPopupReward = payload;
    },
    setTotalRewardRx: (state, { payload }) => {
      state.totalRewardRx = payload;
    },
    setAllTicketsRewardRx: (state, { payload }) => {
      state.allTicketsRewardRx = payload;
    },
  },
});

export const { setOpenPopupReward, setTotalRewardRx, setAllTicketsRewardRx } =
  rewardState.actions;

export default rewardState.reducer;
