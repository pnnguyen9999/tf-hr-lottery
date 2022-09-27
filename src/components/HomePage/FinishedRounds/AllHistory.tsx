import { Skeleton } from "antd";
import useCollapse from "react-collapsed";
import { useSelector } from "react-redux";
import { FIXED_DECIMAL } from "src/constant";
import { CoinValue, PrizePotValue } from "../GetTicket";

export default function AllHistory() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const selectedLotteryData = useSelector((state) => state.globalState.historyLotteryData);
  const loadingSelectedLotteryData = useSelector(
    (state) => state.globalState.loadinghistoryLotteryData
  );
  const currentHistoryLottery = useSelector((state) => state.globalState.currentHistoryLottery);
  const showHegemHistory = currentHistoryLottery === "hegem";

  return (
    <div className="p-3">
      <section {...getCollapseProps()}>
        {!loadingSelectedLotteryData ? (
          <div className="my-3">
            <div className="col-12 align-items-center my-3">
              <div className="row">
                <div className="col-3 fnt-s3 fnt-b cl-w ">Prize Pot</div>
                <div className="col-7 d-flex justify-content-between align-items-center flex-wrap">
                  <PrizePotValue
                    value={(selectedLotteryData?.amountCollectedInHera ?? 0).toFixed(FIXED_DECIMAL)}
                    name="hera"
                  />
                  {showHegemHistory && (
                    <PrizePotValue
                      value={(selectedLotteryData?.amountCollectedInHegem ?? 0).toFixed(
                        FIXED_DECIMAL
                      )}
                      name="hegem"
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="cl-grey fnt-s1 my-3 mb-4">
                Match the winning number in the same order to share prize. Current prizes up for
                grabs:
              </div>
              <div className="col-12">
                <div className="row">
                  {selectedLotteryData?.coinPerBracket.map((match: any) => (
                    <div className="col-md-3 col-6">
                      <div className="d-flex flex-column align-items-start">
                        <div className="fnt-s2 cl-grey">
                          MATCH FIRST {parseInt(match.index) + 1}
                        </div>
                        <CoinValue name="hera" value={(match.hera ?? 0).toFixed(FIXED_DECIMAL)} />
                        {currentHistoryLottery === "hegem" && (
                          <CoinValue
                            name="hegem"
                            value={(match.hegem ?? 0).toFixed(FIXED_DECIMAL)}
                          />
                        )}
                      </div>
                      <div className="fnt-s1 cl-grey">{match.countWinners} Winning Tickets</div>
                    </div>
                  ))}
                </div>
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
  );
}
