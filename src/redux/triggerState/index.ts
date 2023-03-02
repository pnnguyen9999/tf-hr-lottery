import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  triggerLatestDataUseEff: false,
  triggerCurrentPersonalDataUseEff: false,
  triggerConnectWalletUseEff: false,
};

const triggerState = createSlice({
  name: "triggerState",
  initialState,
  reducers: {
    setTriggerLatestDataUseEff: (state) => {
      state.triggerLatestDataUseEff = !state.triggerLatestDataUseEff;
    },
    setTriggerConnectWalletUseEff: (state) => {
      state.triggerConnectWalletUseEff = !state.triggerConnectWalletUseEff;
    },
    setTriggerCurrentPersonalDataUseEff: (state) => {
      state.triggerCurrentPersonalDataUseEff = !state.triggerCurrentPersonalDataUseEff;
    },
  },
});

export const { setTriggerLatestDataUseEff, setTriggerConnectWalletUseEff, setTriggerCurrentPersonalDataUseEff } =
  triggerState.actions;

export default triggerState.reducer;
