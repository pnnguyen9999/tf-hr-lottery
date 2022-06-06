import { ApproveButton } from "@components/common/ApproveButton";
import { BuyTicketButton } from "@components/common/BuyTicketButton";
import { HeroButton } from "@components/common/HeroButton";
import React from "react";

type Props = {};
export interface HeraValue {
  name: "hera" | "hegem";
  value: number;
}
export default function Banner({}: Props) {
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
          <div className="d-flex align-items-center my-2">
            <HeraValue name="hera" value={200909} />
            <HeraValue name="hegem" value={200909} />
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
