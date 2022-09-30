import { TicketWithReward } from "@components/HomePage/ProcessDataCpn";
import { setOpenLoadingPopup, setOpenPopupStatus } from "@redux/globalState";
import { setOpenPopupReward } from "@redux/rewardState";
import { setTriggerCurrentPersonalDataUseEff } from "@redux/triggerState";
import { Modal, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIXED_DECIMAL } from "src/constant";
import { HeroButton } from "../HeroButton";

type Props = {};

export default function RewardPopup({}: Props) {
  const dispatch = useDispatch();
  const isOpenPopupReward = useSelector((state) => state.rewardState.isOpenPopupReward);
  const totalReward = useSelector((state) => state.rewardState.totalRewardRx);
  const currentLotteryId = useSelector((state) => state.globalState.currentLotteryId);
  const allTicketsRewardRx = useSelector((state) => state.rewardState.allTicketsRewardRx);
  const web3data = useSelector((state) => state.web3.utilsWallet);
  const historyPersonalData = useSelector((state) => state.globalState.historyPersonalData);
  const currentHistoryLottery = useSelector((state) => state.globalState.currentHistoryLottery);

  const executeClaim = async () => {
    if (!historyPersonalData?.ticketClaimStatus.includes(true)) {
      let ticketIds = [] as any;
      let brackets = [] as any;
      allTicketsRewardRx.forEach((ticketObject: TicketWithReward) => {
        ticketIds.push(ticketObject.ticket.ticketId);
        brackets.push(ticketObject.ticket.bracket);
      });
      await web3data.claimReward(
        {
          lottery: currentHistoryLottery,
          lotteryId: currentLotteryId,
          ticketIds: ticketIds,
          brackets: brackets,
        },
        async (data: any) => {
          if (data.status === "EXECUTE_CLAIM_TICKET_SUBMIT") {
            dispatch(setOpenLoadingPopup(true));
          } else if (data.status === "EXECUTE_CLAIM_TICKET_SUCCESS") {
            dispatch(setTriggerCurrentPersonalDataUseEff());
            dispatch(setOpenLoadingPopup(false));
            dispatch(setOpenPopupReward(false));
            dispatch(
              setOpenPopupStatus({
                isOpen: true,
                type: "success",
                message: "Claim Successfully !",
              })
            );
          } else if (data.status === "EXECUTE_CLAIM_TICKET_FAIL") {
            dispatch(setTriggerCurrentPersonalDataUseEff());
            dispatch(setOpenLoadingPopup(false));
            dispatch(setOpenPopupReward(false));
            dispatch(
              setOpenPopupStatus({
                isOpen: true,
                type: "fail",
                message: "Claim Failed !",
              })
            );
          }
        }
      );
    } else {
      dispatch(setOpenPopupReward(false));
      dispatch(
        setOpenPopupStatus({
          isOpen: true,
          type: "fail",
          message: "This reward has already been claimed !",
        })
      );
    }
  };
  return (
    <Modal
      title={<div className="cl-br-drk fnt-s3 fnt-b">Collect Winnings</div>}
      style={{ top: 20 }}
      open={isOpenPopupReward}
      footer={false}
      onOk={() => dispatch(setOpenPopupReward(false))}
      onCancel={() => dispatch(setOpenPopupReward(false))}
    >
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center">
          <Space size={10} direction="vertical" className="bdr-bt-popup mb-3 pb-3">
            <div className="fnt-s1 fnt-b cl-br-drk">You Won</div>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <Space direction="vertical" size={5}>
                {currentHistoryLottery === "hegem" && (
                  <div className="fnt-s5 fnt-b cl-br">
                    {totalReward.hegemReward.toFixed(FIXED_DECIMAL)} <span className="cl-yl">HEGEM</span>
                  </div>
                )}
                <div className="fnt-s5 fnt-b cl-br">
                  {totalReward.heraReward.toFixed(FIXED_DECIMAL)} <span className="cl-yl">HERA</span>
                </div>
              </Space>
              <img className="" src="/icons/giftbox.png" />
            </div>
            <div className="fnt-s2 cl-br-drk text-center">Round #{currentLotteryId}</div>
          </Space>
          <div className="d-flex w-100 justify-content-center">
            <HeroButton text="Claim" action={() => executeClaim()} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
