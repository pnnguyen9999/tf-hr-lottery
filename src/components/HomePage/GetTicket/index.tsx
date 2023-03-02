import { HeroButton } from "@components/common/HeroButton";
import React, { useEffect, useState } from "react";
import { HeraValue } from "../Banner";
import useCollapse from "react-collapsed";
import { BuyTicketButton } from "@components/common/BuyTicketButton";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Skeleton, Typography } from "antd";
import { setOnCalculatingTime, setOpenPersonalTicketInfo } from "@redux/globalState";
import { FIXED_DECIMAL } from "src/constant";
import moment from "moment";
import { sliceAddressString } from "@utils/index";
import { HERA_LOTTERY_CONTRACT, IMG_URL } from "src/config";
import { message } from "antd";

type Props = {};

export const PrizePotValue = ({ name, value }: HeraValue) => {
  return (
    <div className="d-flex flex-column align-items-start mr-5">
      <div>
        <div className="fnt-b fnt-s6 cl-yl d-flex align-items-center">
          {value}&nbsp;
          <img src={`${IMG_URL}/img/coins/${name}.png`} className="coin-lg" />
        </div>
      </div>
    </div>
  );
};

export const CoinValue = ({ name, value }: HeraValue) => {
  return (
    <div className="d-flex my-1">
      <div className="fnt-b fnt-s1 mr-2 cl-w">{value}</div>
      <img src={`${IMG_URL}/img/coins/${name}.png`} className="coin-sm" />
    </div>
  );
};

export default function GetTicket({}: Props) {
  const dispatch = useDispatch();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const latestLotteryData = useSelector((state) => state.globalState.latestLotteryData);
  const latestLotteryId = useSelector((state) => state.globalState.latestLotteryId);
  const latestPersonalData = useSelector((state) => state.globalState.latestPersonalData);
  const isOnCalculatingTime = useSelector((state) => state.globalState.isOnCalculatingTime);
  const [countDown, setCountDown] = useState<string>();

  useEffect(() => {
    const intervalCd = setInterval(() => {
      if (latestLotteryData?.drawnTimeMoment) {
        const then: any = new Date(latestLotteryData?.drawnTime).getTime();
        // const then = 1648848951000;
        const now: any = new Date().getTime();
        const diffTimes = then - now;
        if (diffTimes <= 0) {
          clearInterval(intervalCd);
          dispatch(setOnCalculatingTime(true));
        } else {
          dispatch(setOnCalculatingTime(false));
          const duration: any = moment.duration(diffTimes, "milliseconds");
          const result = moment.duration(duration - 1000, "milliseconds");
          setCountDown(`${result.days()} d: ${result.hours()} h: ${result.minutes()} m: ${result.seconds()} s`);
        }
      }
    }, 1000);
    return () => clearInterval(intervalCd);
  }, [latestLotteryData?.drawnTimeMoment]);

  return (
    <div className="get-ticket mb-5">
      <div className="text-center my-5">
        <div className="fnt-s4 cl-w fnt-b">Get your ticket now!</div>
        {!isOnCalculatingTime && (
          <div className="fnt-s3 cl-w my-3">
            Round #{latestLotteryId} ends in &nbsp;
            <span className="fnt-b cl-yl">{countDown || <Skeleton.Input active />}</span>
          </div>
        )}
      </div>
      <div className="get-ticket-cont">
        <div className="p-3 hrz-b d-flex align-items-center flex-wrap">
          <div className="col-12 col-md-3 fnt-b fnt-s3 cl-w">Next Draw{/* Current Draw */}</div>

          <div className="col-12 col-md-auto d-flex">
            <Typography.Text
              className="cl-w"
              style={{ fontSize: "18px" }}
              copyable={{
                text: HERA_LOTTERY_CONTRACT,
                tooltips: false,
                icon: [...Array(2)].map(() => <img src="/icons/copy-icon-btn.png" className="ml-1" />),
                onCopy: () => message.success("Copied"),
              }}
            >
              Contract Address : {sliceAddressString(HERA_LOTTERY_CONTRACT)}
            </Typography.Text>
          </div>
          <div className="cl-w col-auto fnt-s1 ml-md-auto">
            #{latestLotteryId}|Draw: {latestLotteryData?.drawnTime}
          </div>
        </div>
        <div className="p-3 hrz-b">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="col-12 align-items-center my-3">
              <div className="row align-items-center">
                <div className="col-12 col-md-3 fnt-s3 fnt-b cl-w ">Prize Pot</div>
                {!isOnCalculatingTime ? (
                  <div className="col d-flex justify-content-between align-items-center flex-wrap">
                    <PrizePotValue
                      value={(latestLotteryData?.amountCollectedInHera ?? 0).toFixed(FIXED_DECIMAL)}
                      name="hera"
                    />
                  </div>
                ) : (
                  <div className="col fnt-b cl-yl fnt-s5">Calculating...</div>
                )}
              </div>
            </div>
            <div className="col-12 align-items-center my-3">
              <div className="row">
                <div className="col-12 col-md-3 fnt-s3 fnt-b cl-w ">Your Ticket</div>
                <div className="col-md-12 col-lg-7 d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-start flex-column">
                    <div className="fnt-s1 cl-w">
                      You Have <span className="fnt-b cl-yl">{latestPersonalData?.numberOfTickets} Ticket(s)</span> This
                      Round
                    </div>
                    <u
                      className="fnt-s1 cl-br cursor-pointer"
                      onClick={() => dispatch(setOpenPersonalTicketInfo(true))}
                    >
                      View your tickets
                    </u>
                  </div>
                  <div className="mx-auto mx-md-0">
                    <BuyTicketButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <section {...getCollapseProps()}>
            <div>
              <div className="cl-grey fnt-s1 my-3 mb-4">
                Match the winning number in the same order to share prize. Current prizes up for grabs:
              </div>
              <div className="col-12">
                <div className="row">
                  {latestLotteryData?.coinPerBracket.map((obj: any) => (
                    <div className="col-md-3 col-6">
                      <div className="d-flex flex-column align-items-start">
                        <div className="fnt-s2 cl-grey">MATCH FIRST {parseInt(obj.index) + 1}</div>
                        <CoinValue name="hera" value={obj.hera.toFixed(FIXED_DECIMAL)} />
                        {/* <CoinValue
                          name="hegem"
                          value={obj.hegem.toFixed(FIXED_DECIMAL)}
                        /> */}
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
