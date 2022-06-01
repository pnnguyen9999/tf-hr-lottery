import { ConnectButton } from "@components/common/HeroButton";
import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="nav d-flex justify-content-between align-items-center">
      <div>
        <img className="logo" src="/img/logo.png" />
      </div>
      <div className="d-flex">
        <div className="nav-item">Homepage</div>
        <div className="nav-item">Marketplace</div>
        <div className="nav-item">Battle</div>
        <div className="nav-item">Farm</div>
        <div className="nav-item">INO</div>
        <div className="nav-item">Whitepaper</div>
        <ConnectButton text="Connect" type="green" />
      </div>
    </div>
  );
}
