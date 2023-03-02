import { setNumberOfWinningTicket, setOpenHistoryPersonalTicketInfo } from "@redux/globalState";
import { setOpenPopupReward } from "@redux/rewardState";
import { setTriggerCurrentPersonalDataUseEff } from "@redux/triggerState";
import { Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { BuyTicketButton } from "../BuyTicketButton";
import { HeroButton } from "../HeroButton";

type Props = {};

export default function PersonalHistoryPopup({}: Props) {
  const dispatch = useDispatch();
  const historyPersonalData = useSelector(
    (state: DefaultRootState) => state.globalState.historyPersonalData
  );
  const selectedLotteryData = useSelector((state) => state.globalState.historyLotteryData);
  const isOpenPersonalHistoryTicketInfo = useSelector(
    (state: DefaultRootState) => state.globalState.isOpenPersonalHistoryTicketInfo
  );
  const numberOfWinningTickets = useSelector(
    (state: DefaultRootState) => state.globalState.numberOfWinningTickets
  );

  const InputNumberLottery = ({
    _value,
    matchedClass,
  }: {
    _value: string;
    matchedClass: string;
  }): JSX.Element => {
    return (
      <input disabled value={_value} className={`lottery-ticket ${matchedClass} text-center`} />
    );
  };

  const TicketsWithMatched = ({
    objNumber,
    indexNumber,
  }: {
    objNumber: string;
    indexNumber: number;
  }): JSX.Element => {
    const [matched, setMatched] = useState<number>(0);
    const finalNumberArr = selectedLotteryData?.finalNumber.split("");
    const [tempBracket, setTempBracket] = useState<boolean[]>([false, false, false, false]);

    useEffect(() => {
      let cloneBracket = [...tempBracket];
      let cloneMatched = 0;
      for (let i = 0; i < objNumber.split("").length; i++) {
        if (finalNumberArr[i] === objNumber[i]) {
          cloneBracket[i] = true;
          cloneMatched++;
        } else {
          break;
        }
      }
      setTempBracket(cloneBracket);
      setMatched(cloneMatched);
    }, []);

    return (
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-2">
          <div className="cl-br-drk fnt-b fnt-s1">Ticket #{indexNumber + 1}</div>
          <div className="cl-br-drk fnt-s1">Matched {matched}</div>
        </div>
        <div className="d-flex justify-content-around">
          {tempBracket.map((value: boolean, index) => {
            if (value) {
              return <InputNumberLottery _value={objNumber[index]} matchedClass="matched" />;
            }
            return <InputNumberLottery _value={objNumber[index]} matchedClass="" />;
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal
      title={<div className="cl-br-drk fnt-s3 fnt-b">Round {historyPersonalData?.round}</div>}
      style={{ top: 20 }}
      open={isOpenPersonalHistoryTicketInfo}
      footer={false}
      onOk={() => dispatch(setOpenHistoryPersonalTicketInfo(false))}
      onCancel={() => dispatch(setOpenHistoryPersonalTicketInfo(false))}
    >
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center">
          <Space size={10} direction="vertical" className="bdr-bt-popup mb-3 pb-3">
            {!(selectedLotteryData?.finalNumber === "") ? (
              <div className="fnt-s1 fnt-b cl-br-drk">Winning Number</div>
            ) : (
              <></>
            )}
            <Space
              direction="horizontal"
              size={30}
              className="d-flex align-items-center justify-content-center"
            >
              {selectedLotteryData?.finalNumber.split("").map((number: string, index) => (
                <div key={index} className="lottery-number" class-type={number}>
                  {number}
                </div>
              ))}
            </Space>
            <div className="fnt-s1 fnt-b cl-br-drk">Your Tickets</div>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <Space size={10} className="d-flex align-items-center">
                <div>
                  <img className="icon-sm" src="/icons/ticket-icon.png" />
                </div>
                <div className="cl-br-drk fnt-s1">
                  Total Tickets:{" "}
                  <span className="fnt-b">{historyPersonalData?.numberOfTickets}</span>
                </div>
              </Space>
              <br />
              <Space size={10} className="d-flex align-items-center">
                <div>
                  <img className="icon-sm" src="/icons/gift-icon.png" />
                </div>
                <div className="cl-br-drk fnt-s1">
                  Winning Tickets:&nbsp;
                  <span className="fnt-b">{numberOfWinningTickets.length}</span>
                </div>
              </Space>
            </div>
            {historyPersonalData?.tickets.map((obj: string, index: number) => (
              <div
                className="d-flex justify-content-center animate__animated animate__flipInX"
                key={index}
                style={{ animationDelay: `${index / 15}s` }}
              >
                <div className="my-1 w-100">
                  <div className="">
                    <TicketsWithMatched objNumber={obj} indexNumber={index} />
                  </div>
                </div>
              </div>
            ))}
          </Space>
          <div className="d-flex w-100 justify-content-center">
            {numberOfWinningTickets.length > 0 ? (
              <HeroButton
                text="Collect Prizes"
                action={() => {
                  dispatch(setOpenHistoryPersonalTicketInfo(false));
                  dispatch(setOpenPopupReward(true));
                }}
              />
            ) : (
              <HeroButton
                text="Close"
                action={() => dispatch(setOpenHistoryPersonalTicketInfo(false))}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
