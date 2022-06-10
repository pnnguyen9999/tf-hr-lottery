import { ConnectButton } from "@components/common/ConnectButton";
import { HeroButton } from "@components/common/HeroButton";
import { setOpenPopupStatus } from "@redux/globalState";
import { Avatar, Popover, Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};
export const processAddressString = (_address: string): string => {
  return _address.substring(0, 12) + "..." + _address.substring(38);
};
export default function Nav({}: Props) {
  /**
   * @RULE1 -> trừ 1 đơn vị paginate cho load history data
   * @RULE2 -> đơn vị paginate cho load latest giữ nguyeen
   * @currentLotteryId -> lottery ID cho paginate
   * @latestLotteryId -> lottery ID mới nhất get từ contract
   */
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const [isOpenPopoverInfo, setOpenPopoverInfo] = useState<boolean>(false);
  const handleLogOut = () => {
    localStorage.setItem("disconnected", "true");
    window.location.reload();
  };
  const popoverInfoContent = () => {
    return (
      <Space
        direction="vertical"
        size={10}
        className="d-flex flex-column align-items-center p-1"
      >
        <div className="fnt-s1">
          {" "}
          Address:{" "}
          <span className="cl-yl fnt-b">{processAddressString(address)}</span>
        </div>
        <HeroButton text="Log out" action={() => handleLogOut()} />
      </Space>
    );
  };
  return (
    <div className="nav d-flex justify-content-between align-items-center">
      <div>
        <img className="logo" src="/img/logo.png" />
      </div>
      <div className="d-flex">
        <div className="nav-item">Homepage</div>
        <div className="nav-item">Marketplace</div>
        <div className="nav-item">Battle</div>
        <div className="nav-item">Farm</div>
        <div className="nav-item">INO</div>
        <div className="nav-item">Whitepaper</div>
        {!address ? (
          <ConnectButton text="Connect" type="green" />
        ) : (
          <Popover
            content={popoverInfoContent}
            title={
              <div className="fnt-s1 fnt-b mt-2" style={{ color: "#DB5745" }}>
                User info
              </div>
            }
            trigger="click"
            visible={isOpenPopoverInfo}
            onVisibleChange={() => setOpenPopoverInfo(!isOpenPopoverInfo)}
          >
            <Avatar
              className="avatar cursor-pointer"
              src={`https://avatars.dicebear.com/v2/jdenticon/${address}.svg`}
              size={42}
            />
          </Popover>
        )}
      </div>
    </div>
  );
}
