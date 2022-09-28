import { createSlice } from "@reduxjs/toolkit";
import type HeraWalletUtils from "src/lib/class/HeraCryptoWallet";

const initialState = {
  utilsWallet: null as unknown as HeraWalletUtils,
  address: null as unknown as string,
  balance: null as unknown as number,
  allowance: null,
};

const web3 = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setUtilsWallet: (state, { payload }) => {
      state.utilsWallet = payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setAllowance: (state, { payload }) => {
      state.allowance = payload;
    },
  },
});

export const { setUtilsWallet, setAddress, setBalance, setAllowance } = web3.actions;

export default web3.reducer;
