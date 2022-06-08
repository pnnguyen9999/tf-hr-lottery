import { TicketWithReward } from "@components/HomePage/Nav";
import { setOpenPopupReward } from "@redux/rewardState";
import { Modal, Space } from "antd";
import React from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { PersonalData } from "src/lib/hooks/useFetchPersonalInfo";
import { BuyTicketButton } from "../BuyTicketButton";
import { HeroButton } from "../HeroButton";

type Props = {};

export default function RewardPopup({}: Props) {
  const dispatch = useDispatch();
  const isOpenPopupReward = useSelector(
    (state) => state.rewardState.isOpenPopupReward
  );
  const totalReward = useSelector((state) => state.rewardState.totalRewardRx);
  const currentLotteryId = useSelector(
    (state) => state.globalState.currentLotteryId
  );
  const allTicketsRewardRx = useSelector(
    (state) => state.rewardState.allTicketsRewardRx
  );
  const web3data = useSelector((state) => state.web3.utilsWallet) as any;

  const executeClaim = async () => {
    console.log(allTicketsRewardRx);
    let ticketIds = [] as any;
    let brackets = [] as any;
    allTicketsRewardRx.map((ticketObject: TicketWithReward, index: number) => {
      ticketIds.push(ticketObject.ticket.ticketId);
      brackets.push(ticketObject.ticket.bracket);
    });
    await web3data.claimReward(
      {
        lotteryId: currentLotteryId - 1,
        ticketIds: ticketIds,
        brackets: brackets,
      },
      async (data: any) => {
        if (data.status === "EXECUTE_CLAIM_TICKET_SUCCESS") {
          console.log("claim success");
        } else if (data.status === "EXECUTE_CLAIM_TICKET_FAIL") {
          console.log("claim fail");
        }
      }
    );
  };
  return (
    <Modal
      title={<div className="cl-br-drk fnt-s3 fnt-b">Collect Winnings</div>}
      style={{ top: 20 }}
      visible={isOpenPopupReward}
      footer={false}
      onOk={() => dispatch(setOpenPopupReward(false))}
      onCancel={() => dispatch(setOpenPopupReward(false))}
    >
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center">
          <Space
            size={10}
            direction="vertical"
            className="bdr-bt-popup mb-3 pb-3"
          >
            <div className="fnt-s1 fnt-b cl-br-drk">You Won</div>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <Space direction="vertical" size={5}>
                <div className="fnt-s5 fnt-b cl-br">
                  {totalReward.hegemReward} <span className="cl-yl">HEGEM</span>
                </div>
                <div className="fnt-s5 fnt-b cl-br">
                  {totalReward.heraReward} <span className="cl-yl">HERA</span>
                </div>
              </Space>
              <img className="" src="/icons/giftbox.png" />
            </div>
            <div className="fnt-s2 cl-br-drk text-center">
              Round #{currentLotteryId - 1}
            </div>
          </Space>
          <div className="d-flex w-100 justify-content-center">
            <HeroButton text="Claim" action={() => executeClaim()} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
