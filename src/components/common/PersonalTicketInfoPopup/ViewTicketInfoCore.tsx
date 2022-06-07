import { Modal, Space } from "antd";
import React from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { PersonalData } from "src/lib/hooks/useFetchPersonalInfo";
import { BuyTicketButton } from "../BuyTicketButton";

type Props = {
  data: PersonalData;
  setOpen: any;
  visibleState: boolean;
};

export default function ViewTicketInfoCore({
  data,
  setOpen,
  visibleState,
}: Props) {
  const dispatch = useDispatch();
  return (
    <Modal
      title={<div className="cl-br-drk fnt-s3 fnt-b">Round {data?.round}</div>}
      style={{ top: 20 }}
      visible={visibleState}
      footer={false}
      onOk={() => dispatch(setOpen(false))}
      onCancel={() => dispatch(setOpen(false))}
    >
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center">
          <Space
            size={10}
            direction="vertical"
            className="bdr-bt-popup mb-3 pb-3"
          >
            <div className="fnt-s2 fnt-bold cl-br-drk text-center">
              Your Tickets
            </div>
            {data?.tickets.map((obj: any, index: number) => (
              <div
                className="d-flex justify-content-center animate__animated animate__flipInX"
                key={index}
                style={{ animationDelay: `${index / 15}s` }}
              >
                <div className="my-1">
                  <div className="cl-br-drk fnt-s1">Ticket #{index + 1}</div>
                  <OtpInput
                    containerStyle=""
                    isInputNum={true}
                    value={obj}
                    numInputs={4}
                    separator={<span className="px-2">-</span>}
                    inputStyle="lottery-edit"
                    isDisabled
                  />
                </div>
              </div>
            ))}
          </Space>
          <div className="d-flex w-100 justify-content-center">
            <BuyTicketButton />
          </div>
        </div>
      </div>
    </Modal>
  );
}
