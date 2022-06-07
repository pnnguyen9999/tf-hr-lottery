import { ConnectButton } from "@components/common/ConnectButton";
import PersonalTicketInfoPopup from "@components/common/PersonalTicketInfoPopup";
import PersonalHistoryPopup from "@components/common/PersonalTicketInfoPopup/PersonalHistoryPopup";
import {
  setCurrentLotteryId,
  setLoadingHistoryLotteryData,
  setHistoryLotteryData,
  setlatestLotteryData,
  setLoadinglatestLotteryData,
  setlatestLotteryId,
  setlatestPersonalData,
  setHistoryPersonalData,
} from "@redux/globalState";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import useFetchContractInfo from "src/lib/hooks/useFetchContractInfo";
import useFetchPersonalInfo from "src/lib/hooks/useFetchPersonalInfo";
import Web3 from "web3";
type Props = {};

export default function Nav({}: Props) {
  /**
   * @RULE1 -> trừ 1 đơn vị paginate cho load history data
   * @RULE2 -> đơn vị paginate cho load latest giữ nguyeen
   */
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const latestLotteryId = useSelector(
    (state) => state.globalState.latestLotteryId
  );
  const currentLotteryId = useSelector(
    (state) => state.globalState.currentLotteryId
  );
  const selectedLotteryData = useSelector(
    (state) => state.globalState.historyLotteryData
  );

  useEffect(() => {
    const getCurrentRound = async () => {
      const web3 = new Web3(RPC_BSC) as any;
      let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
      const id = await contract.methods.currentLotteryId().call();
      dispatch(setCurrentLotteryId(id));
      dispatch(setlatestLotteryId(id));
    };
    if (window) {
      getCurrentRound();
    }
  }, []);

  useEffect(() => {
    /**
     * -> load latest data
     */
    async function getInfo() {
      if (latestLotteryId) {
        console.log(latestLotteryId);
        dispatch(setLoadinglatestLotteryData(true));
        const data = await useFetchContractInfo(latestLotteryId);
        dispatch(setLoadinglatestLotteryData(false));
        dispatch(setlatestLotteryData(data));
      }
    }
    getInfo();
  }, [latestLotteryId]);

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

  useEffect(() => {
    /**
     * -> load latest personal round info
     */
    async function getInfo() {
      if (address && latestLotteryId) {
        const data = await useFetchPersonalInfo(latestLotteryId, address);
        dispatch(setlatestPersonalData(data));
      }
    }
    getInfo();
  }, [address, latestLotteryId]);

  useEffect(() => {
    /**
     * -> load history personal round info
     */
    async function getInfo() {
      if (address && currentLotteryId) {
        const data = await useFetchPersonalInfo(
          parseInt(currentLotteryId) - 1,
          address
        );
        dispatch(setHistoryPersonalData(data));
      }
    }
    getInfo();
  }, [address, currentLotteryId]);

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
        <div className="nav-item">Battle {latestLotteryId}</div>
        <div className="nav-item">Farm</div>
        <div className="nav-item">INO</div>
        <div className="nav-item">Whitepaper</div>
        {address || <ConnectButton text="Connect" type="green" />}
      </div>
      <PersonalTicketInfoPopup />
      <PersonalHistoryPopup />
    </div>
  );
}
