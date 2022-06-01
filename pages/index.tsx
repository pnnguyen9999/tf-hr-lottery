import Banner from "@components/HomePage/Banner";
import BannerWinner from "@components/HomePage/BannerWinner";
import GetTicket from "@components/HomePage/GetTicket";
import Nav from "@components/HomePage/Nav";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container">
      <Nav />
      <Banner />
      <GetTicket />
      <BannerWinner />
    </div>
  );
};

export default Home;
