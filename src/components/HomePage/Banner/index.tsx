import { ApproveButton } from "@components/common/ApproveButton";
import { BuyTicketButton } from "@components/common/BuyTicketButton";
import { HeroButton } from "@components/common/HeroButton";
import React from "react";
import { useSelector } from "react-redux";
import { FIXED_DECIMAL } from "src/constant";

type Props = {};
export interface HeraValue {
  name: "hera" | "hegem";
  value: number | string;
}
export default function Banner({}: Props) {
  const latestLotteryData = useSelector(
    (state) => state.globalState.latestLotteryData
  );
  const CoinValue = ({ name, value }: HeraValue) => {
    return (
      <div className="bracket-ticket">
        <div
          className="text-center d-flex flex-column align-center-center justify-content-center"
          style={{ height: "100%" }}
        >
          <div className="cl-w fnt-s3 text-uppercase">{name}</div>
          <div className="cl-gradient-yl fnt-s4 fnt-b">{value}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <h4 className="fnt-b cl-w ">LOTTERY</h4>
      <div className="banner-desktop">
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <div className="row w-100 justify-content-center mx-md-5 py-5">
            {/* TWO COLUMNS */}
            <div className="col-12 col-md-5 ml-0 ml-md-5 d-flex flex-column align-items-center">
              <div className="cl-yl fnt-s3 fnt-b mb-2 text-center font-italic">
                From September 1<sup>st</sup>, 2022
              </div>
              <div
                className="cl-w fnt-s6 fnt-b fnt-eff-glow mb-3 text-center"
                style={{ lineHeight: "1.2" }}
              >
                BUY LOTTERY <br className="d-none d-md-block" /> TICKET
              </div>
              <div className="with-hera-token">
                <img src="/img/banner/banner-with-hera-token.png" alt="" />
              </div>
            </div>
            <div className="col mr-0 mr-md-5 d-flex flex-column align-items-center">
              <div className="pool-button" />
              <div className="w-100 d-flex justify-content-center">
                <div className="d-flex align-items-center justify-content-center my-2 flex-wrap">
                  <CoinValue
                    name="hera"
                    value={latestLotteryData?.amountCollectedInHera.toFixed(
                      FIXED_DECIMAL
                    )}
                  />
                  <CoinValue
                    name="hegem"
                    value={latestLotteryData?.amountCollectedInHegem.toFixed(
                      FIXED_DECIMAL
                    )}
                  />
                </div>
              </div>
              <BuyTicketButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
