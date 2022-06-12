import { useDispatch, useSelector } from "react-redux";
import { HeroButton } from "./HeroButton";
import {
  setOpenPersonalTicketInfo,
  setOpenPopupBuyTicket,
} from "@redux/globalState";
import { setTriggerConnectWalletUseEff } from "@redux/triggerState";
import { message } from "antd";
import WalletUtils from "src/lib/class/CryptoWallet";
import { setBalance } from "@redux/web3";

export function BuyTicketButton() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const isOnCalculatingTime = useSelector(
    (state) => state.globalState.isOnCalculatingTime
  );
  const web3data = useSelector((state) => state.web3.utilsWallet) as any;
  return (
    <HeroButton
      text="Buy Ticket"
      action={async () => {
        if (isOnCalculatingTime) {
          if (address) {
            dispatch(setBalance(await web3data.getHegemBalance()));
            dispatch(setOpenPersonalTicketInfo(false));
            dispatch(setOpenPopupBuyTicket(true));
          } else {
            localStorage.setItem("disconnected", "false");
            dispatch(setTriggerConnectWalletUseEff());
          }
        } else {
          message.info("On calculating time !");
        }
      }}
    />
  );
}
