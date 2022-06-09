import { setTriggerConnectWalletUseEff } from "@redux/triggerState";
import { useDispatch } from "react-redux";

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
    dispatch(setTriggerConnectWalletUseEff());
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
