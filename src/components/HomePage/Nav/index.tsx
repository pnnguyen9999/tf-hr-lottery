import { ConnectButton } from "@components/common/ConnectButton";
import { setOpenPopupStatus } from "@redux/globalState";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

export default function Nav({}: Props) {
  /**
   * @RULE1 -> trừ 1 đơn vị paginate cho load history data
   * @RULE2 -> đơn vị paginate cho load latest giữ nguyeen
   * @currentLotteryId -> lottery ID cho paginate
   * @latestLotteryId -> lottery ID mới nhất get từ contract
   */
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);

  return (
    <div className="nav d-flex justify-content-between align-items-center">
      <div>
        <img className="logo" src="/img/logo.png" />
      </div>
      <div className="d-flex">
        <div className="nav-item">Homepage</div>
        <div
          className="nav-item"
          onClick={() =>
            dispatch(
              setOpenPopupStatus({
                isOpen: true,
                type: "fail",
                message: "abcdef",
              })
            )
          }
        >
          Marketplace
        </div>
        <div className="nav-item">Battle</div>
        <div className="nav-item">Farm</div>
        <div className="nav-item">INO</div>
        <div className="nav-item">Whitepaper</div>
        {!address ? (
          <ConnectButton text="Connect" type="green" />
        ) : (
          <Avatar
            className="avatar"
            src={`https://avatars.dicebear.com/v2/jdenticon/${address}.svg`}
            size={42}
          />
        )}
      </div>
    </div>
  );
}
