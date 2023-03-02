import { ApproveButton } from "@components/common/ApproveButton";
import { BuyTicketButton } from "@components/common/BuyTicketButton";
import { HeroButton } from "@components/common/HeroButton";
import React from "react";
import { useSelector } from "react-redux";
import { IMG_URL } from "src/config";
import { FIXED_DECIMAL } from "src/constant";

type Props = {};
export interface HeraValue {
  name: "hera" | "hegem";
  value: number | string;
}

const formatCoinValue = (coinValue: unknown) =>
  typeof coinValue === "number" && !Number.isNaN(coinValue) ? coinValue.toFixed(FIXED_DECIMAL) : "";

export default function Banner({}: Props) {
  const latestHERALotteryData = useSelector((state) => state.globalState.latestLotteryData);
  const latestHegemLottery = useSelector((state) => state.globalState.latestHegemLotteryData);
  const poolAmount = {
    HERA: latestHERALotteryData?.amountCollectedInHera + latestHegemLottery?.amountCollectedInHera,
    hegem: latestHegemLottery?.amountCollectedInHegem,
  };

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
                From October 4<sup>th</sup>, 2022
              </div>
              <div className="cl-w fnt-s6 fnt-b fnt-eff-glow mb-3 text-center" style={{ lineHeight: "1.2" }}>
                BUY LOTTERY <br className="d-none d-md-block" /> TICKET
              </div>
              <div className="with-hera-token">
                <img src={`${IMG_URL}/img/banner/with-hera-bg-effect.png`} alt="" />
                <div className="with-hera-token__text">WITH HERA TOKEN</div>
              </div>
            </div>

            <div className="col mt-md-n3 mr-0 mr-md-5 d-flex flex-column align-items-center">
              <div className="pool-button" />
              <div className="w-100 d-flex justify-content-center">
                <div className="d-flex align-items-center justify-content-center my-2 flex-wrap">
                  <CoinValue name="hera" value={formatCoinValue(poolAmount.HERA)} />
                  <CoinValue name="hegem" value={formatCoinValue(poolAmount.hegem)} />
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
