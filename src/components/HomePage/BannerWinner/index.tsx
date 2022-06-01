import React from "react";

type Props = {};

export default function BannerWinner({}: Props) {
  return (
    <div>
      <img
        className="w-100 d-md-block d-none"
        src="/img/banner/banner-winner-desktop.png"
      />
      <img
        className="w-100 d-md-none d-block"
        src="/img/banner/banner-winner-mobile.png"
      />
    </div>
  );
}
