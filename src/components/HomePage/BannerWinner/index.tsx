import React from "react";
import { IMG_URL } from "src/config";

type Props = {};

export default function BannerWinner({}: Props) {
  return (
    <div>
      <img className="w-100 d-md-block d-none" src={`${IMG_URL}/img/banner/banner-winner-desktop.png`} />
      <img className="w-100 d-md-none d-block" src={`${IMG_URL}/img/banner/banner-winner-mobile.png`} />
    </div>
  );
}
