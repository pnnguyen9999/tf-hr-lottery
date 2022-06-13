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
  const HeraValue = ({ name, value }: HeraValue) => {
    return (
      <div className="hera-value">
        <div>
          <img src={`/img/coins/${name}.png`} />
        </div>
        <div className="cl-yl fnt-s6 fnt-b">{value}</div>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <h4 className="fnt-b cl-w ">LOTTERY</h4>
      <div className="banner-desktop">
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <div className="cl-br fnt-s5 fnt-b">The Hero Arena Lottery</div>
          <div className="d-flex align-items-center my-2 flex-wrap">
            <HeraValue
              name="hera"
              value={latestLotteryData?.amountCollectedInHera.toFixed(
                FIXED_DECIMAL
              )}
            />
            <HeraValue
              name="hegem"
              value={latestLotteryData?.amountCollectedInHegem.toFixed(
                FIXED_DECIMAL
              )}
            />
          </div>
          <div className="cl-br fnt-s2 fnt-b my-2">In Prizes</div>
          <div className="bagde">
            <BuyTicketButton />
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
