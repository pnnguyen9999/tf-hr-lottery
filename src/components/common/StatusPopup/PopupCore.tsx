import { setOpenPopupStatus } from "@redux/globalState";
import { Modal, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeroButton } from "../HeroButton";

export default function PopupCore() {
  const dispatch = useDispatch();
  const isOpenPopupStatus = useSelector(
    (state) => state.globalState.isOpenPopupStatus
  );
  return (
    <Modal
      title={false}
      centered
      style={{ top: 20 }}
      open={isOpenPopupStatus.isOpen}
      footer={false}
      onOk={() =>
        dispatch(
          setOpenPopupStatus({
            isOpen: false,
            type: isOpenPopupStatus.type,
            message: isOpenPopupStatus.message,
          })
        )
      }
      onCancel={() =>
        dispatch(
          setOpenPopupStatus({
            isOpen: false,
            type: isOpenPopupStatus.type,
            message: isOpenPopupStatus.message,
          })
        )
      }
    >
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center">
          <Space
            size={10}
            direction="vertical"
            className="bdr-bt-popup mb-3 pb-3"
          >
            <div className="text-center">
              {isOpenPopupStatus.type === "success" ? (
                <img src="/icons/success.png" className="icon-lg" />
              ) : (
                <img src="/icons/failed.png" className="icon-lg" />
              )}
            </div>
            <div className="fnt-s4 fnt-b cl-br-drk text-center mt-2">
              {isOpenPopupStatus.message}
            </div>
          </Space>
          <div className="d-flex w-100 justify-content-center">
            <HeroButton
              text="Close"
              action={() =>
                dispatch(
                  setOpenPopupStatus({
                    isOpen: false,
                    type: isOpenPopupStatus.type,
                    message: isOpenPopupStatus.message,
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
