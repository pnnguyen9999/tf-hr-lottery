import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";
import { Skeleton, Space } from "antd";
import {
  setCurrentLotteryId,
  setOpenHistoryPersonalTicketInfo,
} from "@redux/globalState";
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";

type Props = {};

export default function PersonalHistory({}: Props) {
  const dispatch = useDispatch();
  const latestLotteryId = useSelector(
    (state) => state.globalState.latestLotteryId
  );
  const selectedLotteryData = useSelector(
    (state) => state.globalState.historyLotteryData
  );
  const currentLotteryId = useSelector(
    (state) => state.globalState.currentLotteryId
  );
  const loadingSelectedLotteryData = useSelector(
    (state) => state.globalState.loadinghistoryLotteryData
  );

  const historyPersonalData = useSelector(
    (state) => state.globalState.historyPersonalData
  );

  const canPaginate = () => {
    return true;
  };

  return (
    <div className="personal-history">
      <div className="personal-history-cont">
        <div className="p-4 hrz-b d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <div className="cl-w fnt-b fnt-s3 d-flex align-items-center">
              Rounds
              <span className="order-badge ml-2">#{currentLotteryId - 1}</span>
            </div>
            <div className="cl-grey fnt-s1 my-1">
              Drawn {selectedLotteryData?.drawnTime}
            </div>
          </div>
          <div className="d-flex align-items-center justity-content-end cl-grey">
            <Space direction="horizontal" size={15}>
              <ArrowLeftOutlined
                style={{
                  color: !(currentLotteryId - 1 === 1) ? "#FFB601" : "#605F60",
                }}
                onClick={() => {
                  if (!(currentLotteryId - 1 === 1)) {
                    dispatch(setCurrentLotteryId(currentLotteryId - 1));
                  }
                }}
              />
              <ArrowRightOutlined
                style={{
                  color: !(currentLotteryId === latestLotteryId)
                    ? "#FFB601"
                    : "#605F60",
                }}
                onClick={() => {
                  if (!(currentLotteryId === latestLotteryId)) {
                    dispatch(setCurrentLotteryId(currentLotteryId + 1));
                  }
                }}
              />
              <VerticalLeftOutlined
                onClick={() => {
                  dispatch(setCurrentLotteryId(latestLotteryId));
                }}
              />
            </Space>
          </div>
        </div>

        {!loadingSelectedLotteryData ? (
          <RibbonContainer className="p-4 hrz-b d-flex justify-content-between align-items-center">
            {currentLotteryId === latestLotteryId && (
              <RightCornerRibbon
                backgroundColor="#D91C34"
                color="#FFFFFF"
                fontFamily="fontbold"
              >
                Latest
              </RightCornerRibbon>
            )}

            <div className="cl-w fnt-b fnt-s3">Winning Number</div>
            <Space
              direction="horizontal"
              size={15}
              className="d-flex align-items-center"
            >
              {selectedLotteryData?.finalNumber
                .split("")
                .map((number: string) => (
                  <div className="lottery-number" class-type={number}>
                    {number}
                  </div>
                ))}
            </Space>
          </RibbonContainer>
        ) : (
          <div className="p-3">
            <Skeleton active />
          </div>
        )}
        <div className="p-4">
          <div className="row">
            <div className="col-3 fnt-s3 fnt-b cl-w ">Your Ticket</div>
            <div className="col-7 d-flex justify-content-between align-items-center flex-wrap">
              <div className="d-flex align-items-start flex-column">
                <div className="fnt-s1 cl-w">
                  You Have{" "}
                  <span className="fnt-b cl-yl">
                    {historyPersonalData?.numberOfTickets} Ticket
                  </span>{" "}
                  This Round
                </div>
                <u
                  className="fnt-s1 cl-br cursor-pointer"
                  onClick={() =>
                    dispatch(setOpenHistoryPersonalTicketInfo(true))
                  }
                >
                  View your tickets
                </u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
