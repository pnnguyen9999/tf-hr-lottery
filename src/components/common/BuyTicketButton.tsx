import { setOpenPersonalTicketInfo, setOpenPopupBuyTicket } from "@redux/globalState";
import { setTriggerConnectWalletUseEff } from "@redux/triggerState";
import { setBalance } from "@redux/web3";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HeroButton } from "./HeroButton";

export function BuyTicketButton() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const isOnCalculatingTime = useSelector((state) => state.globalState.isOnCalculatingTime);
  const web3data = useSelector((state) => state.web3.utilsWallet);
  return (
    <HeroButton
      text="Buy Ticket"
      action={async () => {
        if (!isOnCalculatingTime) {
          if (address) {
            dispatch(setBalance(await web3data.getHERABalance()));
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
