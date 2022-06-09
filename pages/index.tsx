import Banner from "@components/HomePage/Banner";
import BannerWinner from "@components/HomePage/BannerWinner";
import Charts from "@components/HomePage/Charts/index";
import GetTicket from "@components/HomePage/GetTicket";
import HowToPlay from "@components/HomePage/HowToPlay";
import Nav from "@components/HomePage/Nav";
import ProcessDataCpn from "@components/HomePage/ProcessDataCpn";
import dynamic from "next/dynamic";
import React from "react";
const FinishedRounds: any = dynamic(
  () => import("@components/HomePage/FinishedRounds"),
  {
    ssr: false,
  }
);
const Home: React.FC = () => {
  return (
    <div className="home-lottery">
      <div className="container">
        <ProcessDataCpn />
        <Nav />
        <Banner />
        <GetTicket />
        {/* <BannerWinner /> */}
        <FinishedRounds />
        <HowToPlay />
        <Charts />
      </div>
    </div>
  );
};

export default Home;
