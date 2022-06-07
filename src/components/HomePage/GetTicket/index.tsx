import { HeroButton } from "@components/common/HeroButton";
import React from "react";
import { HeraValue } from "../Banner";
import useCollapse from "react-collapsed";
import { BuyTicketButton } from "@components/common/BuyTicketButton";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { setOpenPersonalTicketInfo } from "@redux/globalState";

type Props = {};

export const PrizePotValue = ({ name, value }: HeraValue) => {
  return (
    <div className="d-flex flex-column align-items-start mr-5">
      <div>
        <div className="fnt-b fnt-s6 cl-yl d-flex align-items-center">
          {value}&nbsp;
          <img src={`/img/coins/${name}.png`} className="coin-lg" />
        </div>
      </div>
    </div>
  );
};

export const CoinValue = ({ name, value }: HeraValue) => {
  return (
    <div className="d-flex my-1">
      <div className="fnt-b fnt-s1 mr-2 cl-w">{value}</div>
      <img src={`/img/coins/${name}.png`} className="coin-sm" />
    </div>
  );
};

export default function GetTicket({}: Props) {
  const dispatch = useDispatch();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const latestLotteryData = useSelector(
    (state) => state.globalState.latestLotteryData
  );
  const latestLotteryId = useSelector(
    (state) => state.globalState.latestLotteryId
  );
  const latestPersonalData = useSelector(
    (state) => state.globalState.latestPersonalData
  );
  return (
    <div className="get-ticket mb-5">
      <div className="text-center my-5">
        <div className="fnt-s4 cl-w fnt-b">Get your ticket now!</div>
        <div className="fnt-s3 cl-w my-3">
          <span className="fnt-b cl-yl">1d: 1h: 44m</span>&nbsp;Until the draw
        </div>
      </div>
      <div className="get-ticket-cont">
        <div className="p-3 hrz-b d-flex justify-content-between align-items-center flex-wrap">
          <div className="fnt-b fnt-s3 cl-w">Next Draw</div>
          <div className="fnt-s1 cl-w">
            #{latestLotteryId}|Draw: {latestLotteryData?.drawnTime}
          </div>
        </div>
        <div className="p-3 hrz-b">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="col-12 align-items-center my-3">
              <div className="row">
                <div className="col-3 fnt-s3 fnt-b cl-w ">Prize Pot</div>
                <div className="col-7 d-flex justify-content-between align-items-center flex-wrap">
                  <PrizePotValue
                    value={latestLotteryData?.amountCollectedInHera}
                    name="hera"
                  />
                  <PrizePotValue
                    value={latestLotteryData?.amountCollectedInHegem}
                    name="hegem"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 align-items-center my-3">
              <div className="row">
                <div className="col-3 fnt-s3 fnt-b cl-w ">Your Ticket</div>
                <div className="col-7 d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-start flex-column">
                    <div className="fnt-s1 cl-w">
                      You Have{" "}
                      <span className="fnt-b cl-yl">
                        {latestPersonalData?.numberOfTickets} Ticket
                      </span>{" "}
                      This Round
                    </div>
                    <u
                      className="fnt-s1 cl-br cursor-pointer"
                      onClick={() => dispatch(setOpenPersonalTicketInfo(true))}
                    >
                      View your tickets
                    </u>
                  </div>
                  <BuyTicketButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <section {...getCollapseProps()}>
            <div>
              <div className="cl-grey fnt-s1 my-3 mb-4">
                Match the winning number in the same order to share prize.
                Current prizes up for grabs:
              </div>
              <div className="col-12">
                <div className="row">
                  {latestLotteryData?.coinPerBracket.map((obj: any) => (
                    <div className="col-md-3 col-6">
                      <div className="d-flex flex-column align-items-start">
                        <div className="fnt-s2 cl-grey">
                          MATCH FIRST {parseInt(obj.index) + 1}
                        </div>
                        <CoinValue name="hera" value={obj.hera} />
                        <CoinValue name="hegem" value={obj.hegem} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div className="w-100 d-flex justify-content-center mt-3">
            <div {...getToggleProps()}>
              {isExpanded ? (
                <>
                  Hide&nbsp;
                  <img src="/icons/up-arrow.png" />
                </>
              ) : (
                <>
                  Detail&nbsp;
                  <img src="/icons/down-arrow.png" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
