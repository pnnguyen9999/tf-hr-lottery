import Banner from "@components/HomePage/Banner";
import Charts from "@components/HomePage/Charts/index";
import Footer from "@components/HomePage/Footer";
import GetTicket from "@components/HomePage/GetTicket";
import HowToPlay from "@components/HomePage/HowToPlay";
import LoginMetamask from "@components/HomePage/LoginMetamask";
import Nav from "@components/HomePage/Nav";
import ProcessHERAContractDataCpn from "@components/HomePage/ProcessHERALotteryDataCpn";
import dynamic from "next/dynamic";
import React from "react";

const FinishedRounds: any = dynamic(() => import("@components/HomePage/FinishedRounds"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
    <div className="home-lottery">
      <div className="container overflow-hidden">
        <ProcessHERAContractDataCpn />
        <LoginMetamask />
        <Nav />
        <Banner />
        <GetTicket />
        <FinishedRounds />
        <HowToPlay />
        <Charts />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
