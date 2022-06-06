import {
  setAddress,
  setAllowance,
  setBalance,
  setUtilsWallet,
} from "@redux/web3";
import { useDispatch } from "react-redux";
import WalletUtils from "src/lib/class/CryptoWallet";

export interface ConnectButton {
  /**
   * khai báo kiểu nút
   */
  type: "yellow" | "gray" | "green";
  /**
   * khai báo nội dung text hiển thị
   */
  text: string;
}

export function ConnectButton({ type, text }: ConnectButton) {
  const dispatch = useDispatch();
  const handleConnect = async () => {
    if (window.ethereum) {
      const walletMetamask = new WalletUtils();
      await walletMetamask.connect();
      dispatch(setUtilsWallet(walletMetamask));
      dispatch(setBalance(await walletMetamask.getHegemBalance()));
      dispatch(setAllowance(await walletMetamask.getAllowance()));
      dispatch(setAddress(await walletMetamask.getCurrentAddress()));
    }
  };
  const ReturnImgBg = () => {
    switch (type) {
      case "green": {
        return "/img/buttons/button-green.png";
      }
    }
  };
  return (
    <div className="connectbutton" onClick={() => handleConnect()}>
      <div className={`connectbutton--text-${type}`}>{text}</div>
      <img src={ReturnImgBg()} style={{ height: "46px", width: "120px" }} />
    </div>
  );
}
