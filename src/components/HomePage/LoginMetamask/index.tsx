import { setTriggerConnectWalletUseEff, setTriggerLatestDataUseEff } from "@redux/triggerState";
import { setAddress, setAllowance, setBalance, setUtilsWallet } from "@redux/web3";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeraWalletUtils from "src/lib/class/HeraCryptoWallet";

type Props = {};

export default function LoginMetamask({}: Props) {
  const dispatch = useDispatch();
  const triggerConnectWalletUseEff = useSelector((state) => state.triggerState.triggerConnectWalletUseEff);
  const web3data = useSelector((state) => state.web3.utilsWallet);

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

  // update balance manually
  useEffect(() => {
    if (web3data) {
      const balanceInterval = setInterval(async () => {
        dispatch(setBalance(await web3data.getHERABalance()));
      }, 500);

      return () => {
        clearInterval(balanceInterval);
      };
    }
  }, [web3data]);

  // useEffect(() => {
  //   const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://bsc-dataseed.binance.org/"));
  //   const myContract = new web3.eth.Contract(heraABI as AbiItem[], HERA_ADDRESS);

  //   myContract.events
  //     .Transfer({})
  //     .on("data", (event) => console.log(event))
  //     .on("changed", (changed) => console.log(changed))
  //     .on("error", (err) => console.log("error", err.message, err.stack))
  //     .on("connected", (str) => console.log(str));
  // }, []);

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
