import React, { ReactElement } from "react";
import { Skeleton, Space, Tabs } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";
import useCollapse from "react-collapsed";
import { CoinValue, PrizePotValue } from "../GetTicket";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLotteryId } from "@redux/globalState";

export default function FinishedRounds(): ReactElement {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const selectedLotteryData = useSelector(
    (state) => state.globalState.selectedLotteryData
  );
  const currentLotteryId = useSelector(
    (state) => state.globalState.currentLotteryId
  );
  const loadingSelectedLotteryData = useSelector(
    (state) => state.globalState.loadingSelectedLotteryData
  );

  return (
    <div className="finished-rounds my-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center cl-w fnt-b fnt-s5">Finished Rounds</div>
      <Tabs
        defaultActiveKey={"allhistory"}
        onChange={() => {}}
        animated={false}
        tabBarGutter={8}
        className="w-100"
      >
        <TabPane tab="All History" key="allhistory">
          <div className="all-history">
            <div className="all-history-cont">
              <div className="p-4 hrz-b d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <div className="cl-w fnt-b fnt-s3 d-flex align-items-center">
                    Rounds
                    <span className="order-badge ml-2">
                      #{currentLotteryId}
                    </span>
                  </div>
                  <div className="cl-grey fnt-s1 my-1">
                    Drawn Apr9, 2022, 7:00 PM
                  </div>
                </div>
                <div className="d-flex align-items-center justity-content-end cl-grey">
                  <Space direction="horizontal" size={15}>
                    <ArrowLeftOutlined
                      style={{ color: "#FFB601" }}
                      onClick={() =>
                        dispatch(
                          setCurrentLotteryId(parseInt(currentLotteryId) - 1)
                        )
                      }
                    />
                    <ArrowRightOutlined
                      onClick={() =>
                        dispatch(
                          setCurrentLotteryId(parseInt(currentLotteryId) + 1)
                        )
                      }
                    />
                    <VerticalLeftOutlined />
                  </Space>
                </div>
              </div>

              {!loadingSelectedLotteryData ? (
                <RibbonContainer className="p-4 hrz-b d-flex justify-content-between align-items-center">
                  <RightCornerRibbon
                    backgroundColor="#D91C34"
                    color="#FFFFFF"
                    fontFamily="fontbold"
                  >
                    Latest
                  </RightCornerRibbon>
                  <div className="cl-w fnt-b fnt-s3">Winning Number</div>
                  <Space
                    direction="horizontal"
                    size={15}
                    className="d-flex align-items-center"
                  >
                    {selectedLotteryData?.finalNumber
                      .toString()
                      .split("")
                      .map((number: number) => (
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

              <div className="p-3">
                <section {...getCollapseProps()}>
                  {!loadingSelectedLotteryData ? (
                    <div>
                      <div className="col-12 align-items-center my-3">
                        <div className="row">
                          <div className="col-3 fnt-s3 fnt-b cl-w ">
                            Prize Pot
                          </div>
                          <div className="col-7 d-flex justify-content-between align-items-center flex-wrap">
                            <PrizePotValue
                              value={selectedLotteryData?.amountCollectedInHera}
                              name="hera"
                            />
                            <PrizePotValue
                              value={
                                selectedLotteryData?.amountCollectedInHegem
                              }
                              name="hegem"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="cl-grey fnt-s1 my-3 mb-4">
                          Match the winning number in the same order to share
                          prize. Current prizes up for grabs:
                        </div>
                        <div className="col-12">
                          <div className="row">
                            {selectedLotteryData?.coinPerBracket.map(
                              (obj: any) => (
                                <div className="col-md-3 col-6">
                                  <div className="d-flex flex-column align-items-start">
                                    <div className="fnt-s2 cl-grey">
                                      MATCH FIRST {parseInt(obj.index) + 1}
                                    </div>
                                    <CoinValue name="hera" value={obj.hera} />
                                    <CoinValue name="hegem" value={obj.hegem} />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="cl-grey fnt-s1 my-3 mb-4">
                          Total players this round: 997
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      <Skeleton active />
                    </div>
                  )}
                </section>
                <div className="w-100 d-flex justify-content-center mt-3 cl-w">
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
        </TabPane>
        <TabPane tab="Your History" key="yourhistory">
          321
        </TabPane>
      </Tabs>
    </div>
  );
}
