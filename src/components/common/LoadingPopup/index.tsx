import { setOpenLoadingPopup, setOpenPopupStatus } from "@redux/globalState";
import { Modal, Space, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeroButton } from "../HeroButton";
import { LoadingOutlined } from "@ant-design/icons";

export default function LoadingPopup() {
  const dispatch = useDispatch();
  const isOpenPopupStatus = useSelector(
    (state) => state.globalState.isOpenLoadingPopup
  );
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 22, fontWeight: "bold", color: "#66360F" }}
      spin
    />
  );
  return (
    <Modal
      title={false}
      centered
      style={{ top: 20 }}
      open={isOpenPopupStatus}
      //   open={true}
      footer={false}
      closeIcon={() => <div></div>}
      bodyStyle={{ zIndex: 9999 }}
      //   onOk={() => dispatch(setOpenLoadingPopup(false))}
      //   onCancel={() => dispatch(setOpenLoadingPopup(false))}
    >
      <div
        className="d-flex flex-column justify-content-center"
        style={{ zIndex: 9999 }}
      >
        <div className="d-flex flex-column justify-content-center">
          <Space size={10} direction="vertical" className="">
            <div className="fnt-b fnt-s2 cl-br-drk d-flex align-items-center">
              <span>
                <Spin indicator={antIcon} />
              </span>
              &nbsp; Transaction processing ...
            </div>
          </Space>
        </div>
      </div>
    </Modal>
  );
}
