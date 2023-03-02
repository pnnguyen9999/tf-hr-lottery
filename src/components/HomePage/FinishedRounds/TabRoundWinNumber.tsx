import { ArrowLeftOutlined, ArrowRightOutlined, VerticalLeftOutlined } from "@ant-design/icons";
import { setCurrentHistoryLottery, setCurrentLotteryId } from "@redux/globalState";
import { sliceAddressString } from "@utils/index";
import { message, Skeleton, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RibbonContainer, RightCornerRibbon } from "react-ribbons";
import { LotteryTokenUnit } from "src/@types";
import { HERA_LOTTERY_CONTRACT, LOTTERY_CONTRACT as HEGEM_LOTTERY_CONTRACT } from "src/config";
import { HeraValue } from "../Banner";

const NavRoundWinNumber = (): JSX.Element => {
  const dispatch = useDispatch();
  const latestLotteryId = useSelector((state) => state.globalState.latestLotteryId);
  const latestHegemLotteryId = useSelector((state) => state.globalState.latestHegemLotteryId);

  const selectedLotteryData = useSelector((state) => state.globalState.historyLotteryData);
  const currentLotteryId = useSelector((state) => state.globalState.currentLotteryId);
  const loadingSelectedLotteryData = useSelector((state) => state.globalState.loadinghistoryLotteryData);
  const currentHistoryLottery = useSelector((state) => state.globalState.currentHistoryLottery);

  const displayLotteryContractAddress =
    currentHistoryLottery === "hegem" ? HEGEM_LOTTERY_CONTRACT : HERA_LOTTERY_CONTRACT;

  const prevLottery = (() => {
    const resLottery = {
      id: currentLotteryId - 1,
      type: currentHistoryLottery,
    };

    if (resLottery.id >= 1) return resLottery;

    if (resLottery.type === "hera" && latestHegemLotteryId > 0) {
      return {
        id: latestHegemLotteryId,
        type: "hegem" as LotteryTokenUnit,
      };
    }
    return null;
  })();

  const nextLottery = (() => {
    const resLottery = {
      id: currentLotteryId + 1,
      type: currentHistoryLottery,
    };

    if (resLottery.type === "hera" && resLottery.id >= latestLotteryId) return null;

    if (resLottery.type === "hegem" && resLottery.id > latestHegemLotteryId) {
      return {
        id: 1,
        type: "hera" as LotteryTokenUnit,
      };
    }

    return resLottery;
  })();

  return (
    <>
      <div className="p-2 p-md-4 hrz-b d-flex align-items-baseline align-items-sm-center">
        <div className="d-flex flex-column col-7 col-sm-3">
          <div className="cl-w fnt-b fnt-s3 d-flex align-items-center">
            Rounds
            <span className="order-badge ml-2">#{currentLotteryId}</span>
          </div>
          <div className="cl-grey fnt-s1 my-1 text-nowrap">Drawn {selectedLotteryData?.drawnTime}</div>
        </div>

        <div className="col d-none d-md-block px-5">
          <Typography.Text
            className="fnt-s2 cl-w"
            copyable={{
              text: displayLotteryContractAddress,
              tooltips: false,
              icon: Array.from(Array(2)).map(() => <img src="/icons/copy-icon-btn.png" className="ml-1" />),
              onCopy: () => message.success("Copied"),
            }}
          >
            Contract Address : {sliceAddressString(displayLotteryContractAddress)}
          </Typography.Text>
        </div>

        <div className="d-flex align-items-center justity-content-end cl-grey ml-auto">
          <Space direction="horizontal" size={15}>
            <ArrowLeftOutlined
              style={{
                color: prevLottery ? "#FFB601" : "#605F60",
              }}
              onClick={() => {
                if (prevLottery) {
                  dispatch(setCurrentLotteryId(prevLottery.id));
                  dispatch(setCurrentHistoryLottery(prevLottery.type));
                }
              }}
            />
            <ArrowRightOutlined
              style={{
                color: nextLottery ? "#FFB601" : "#605F60",
              }}
              onClick={() => {
                if (nextLottery) {
                  dispatch(setCurrentLotteryId(nextLottery.id));
                  dispatch(setCurrentHistoryLottery(nextLottery.type));
                }
              }}
            />
            <VerticalLeftOutlined
              onClick={() => {
                dispatch(setCurrentLotteryId(latestLotteryId - 1));
                dispatch(setCurrentHistoryLottery("hera"));
              }}
            />
          </Space>
        </div>
      </div>
      {!loadingSelectedLotteryData ? (
        <RibbonContainer className="p-4 hrz-b d-flex flex-wrap justify-content-between align-items-center">
          {currentLotteryId === latestLotteryId - 1 && (
            <RightCornerRibbon backgroundColor="#D91C34" color="#FFFFFF" fontFamily="fontbold">
              Latest
            </RightCornerRibbon>
          )}
          <div className="cl-w fnt-b fnt-s3">Winning Number</div>
          <Space direction="horizontal" size={15} className="d-flex align-items-center">
            {selectedLotteryData?.finalNumber.split("").map((number: string) => (
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
    </>
  );
};

export default NavRoundWinNumber;
