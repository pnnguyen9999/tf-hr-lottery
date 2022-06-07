import { ConnectButton } from "@components/common/ConnectButton";
import {
  setCurrentLotteryId,
  setLoadingHistoryLotteryData,
  setHistoryLotteryData,
  setLastestLotteryData,
  setLoadingLastestLotteryData,
  setLastestLotteryId,
} from "@redux/globalState";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOTTERY_CONTRACT } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import useFetchContractInfo from "src/lib/hooks/useFetchContractInfo";
import Web3 from "web3";
type Props = {};

export default function Nav({}: Props) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const lastestLotteryId = useSelector(
    (state) => state.globalState.lastestLotteryId
  );
  const currentLotteryId = useSelector(
    (state) => state.globalState.currentLotteryId
  );
  const selectedLotteryData = useSelector(
    (state) => state.globalState.historyLotteryData
  );

  useEffect(() => {
    const getCurrentRound = async () => {
      const web3 = new Web3(window.ethereum) as any;
      let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
      const id = await contract.methods.currentLotteryId().call();
      dispatch(setCurrentLotteryId(id));
      dispatch(setLastestLotteryId(id));
    };
    if (window) {
      getCurrentRound();
    }
  }, []);

  useEffect(() => {
    /**
     * -> load lastest data
     */
    async function getInfo() {
      if (lastestLotteryId) {
        console.log(lastestLotteryId);
        dispatch(setLoadingLastestLotteryData(true));
        const data = await useFetchContractInfo(lastestLotteryId);
        dispatch(setLoadingLastestLotteryData(false));
        dispatch(setLastestLotteryData(data));
      }
    }
    getInfo();
  }, [lastestLotteryId]);

  useEffect(() => {
    /**
     * -> load paginate history data
     */
    async function getInfo() {
      if (currentLotteryId) {
        console.log(currentLotteryId);
        dispatch(setLoadingHistoryLotteryData(true));
        const data = await useFetchContractInfo(parseInt(currentLotteryId) - 1);
        dispatch(setLoadingHistoryLotteryData(false));
        dispatch(setHistoryLotteryData(data));
      }
    }
    getInfo();
  }, [currentLotteryId]);

  useEffect(() => {
    console.log(selectedLotteryData);
  }, [selectedLotteryData]);
  return (
    <div className="nav d-flex justify-content-between align-items-center">
      <div>
        <img className="logo" src="/img/logo.png" />
      </div>
      <div className="d-flex">
        <div
          className="nav-item"
          onClick={() =>
            dispatch(setCurrentLotteryId(parseInt(currentLotteryId) - 1))
          }
        >
          Homepage {currentLotteryId}
        </div>
        <div
          className="nav-item"
          onClick={() =>
            dispatch(setCurrentLotteryId(parseInt(currentLotteryId) + 1))
          }
        >
          Marketplace
        </div>
        <div className="nav-item">Battle {lastestLotteryId}</div>
        <div className="nav-item">Farm</div>
        <div className="nav-item">INO</div>
        <div className="nav-item">Whitepaper</div>
        {address || <ConnectButton text="Connect" type="green" />}
      </div>
    </div>
  );
}
