import { setTriggerConnectWalletUseEff, setTriggerLatestDataUseEff } from "@redux/triggerState";
import { setAddress, setAllowance, setBalance, setUtilsWallet } from "@redux/web3";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeraWalletUtils from "src/lib/class/HeraCryptoWallet";

type Props = {};

export default function LoginMetamask({}: Props) {
  const dispatch = useDispatch();
  const triggerConnectWalletUseEff = useSelector(
    (state) => state.triggerState.triggerConnectWalletUseEff
  );

  useEffect(() => {
    async function connectWallet() {
      if (window.ethereum) {
        const localDisconnect: any = localStorage.getItem("disconnected");
        if (JSON.parse(localDisconnect) === false) {
          const walletMetamask = new HeraWalletUtils();
          await walletMetamask.connect();
          dispatch(setUtilsWallet(walletMetamask));
          dispatch(setBalance(await walletMetamask.getHERABalance()));
          // console.log(LoginMetamask, walletMetamask.currentBalance);
          dispatch(setAllowance(await walletMetamask.getAllowanceHERA()));
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
