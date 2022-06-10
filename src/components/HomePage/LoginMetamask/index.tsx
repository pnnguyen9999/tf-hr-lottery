import {
  setTriggerConnectWalletUseEff,
  setTriggerLatestDataUseEff,
} from "@redux/triggerState";
import {
  setAddress,
  setAllowance,
  setBalance,
  setUtilsWallet,
} from "@redux/web3";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WalletUtils from "src/lib/class/CryptoWallet";

type Props = {};

export default function LoginMetamask({}: Props) {
  const dispatch = useDispatch();
  const triggerConnectWalletUseEff = useSelector(
    (state) => state.triggerState.triggerConnectWalletUseEff
  );

  useEffect(() => {
    console.log("123");
    async function connectWallet() {
      if (window.ethereum) {
        const localDisconnect: any = localStorage.getItem("disconnected");
        if (JSON.parse(localDisconnect) === false) {
          const walletMetamask = new WalletUtils();
          await walletMetamask.connect();
          dispatch(setUtilsWallet(walletMetamask));
          dispatch(setBalance(await walletMetamask.getHegemBalance()));
          dispatch(setAllowance(await walletMetamask.getAllowance()));
          dispatch(setAddress(await walletMetamask.getCurrentAddress()));
          // localStorage.setItem("disconnected", "false");
        }
      }
    }
    connectWallet();
  }, [triggerConnectWalletUseEff]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accountID: any) => {
        // console.log("acc changed");
        dispatch(setTriggerConnectWalletUseEff());
        dispatch(setTriggerLatestDataUseEff());
      });
    }
  }, []);
  return <></>;
}
