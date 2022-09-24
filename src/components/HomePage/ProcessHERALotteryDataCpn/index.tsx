import PersonalLatestPopup from "@components/common/PersonalTicketInfoPopup/PersonalLatestPopup";
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
  setNumberOfWinningTicket,
  setMaxAmountCanBuy,
} from "@redux/globalState";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOTTERY_CONTRACT as LOTTERY_HEGEM_CONTRACT,
  LOTTERY_HERA_CONTRACT,
  RPC_BSC,
} from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import lotteryHeraABI from "src/lib/contract/lotteryHeraABI.abi.json";
// import useFetchContractInfo from "src/lib/hooks/useFetchContractInfo";
import useFetchPersonalInfo, {
  Ticket,
} from "src/lib/hooks/useFetchPersonalInfo";
import Web3 from "web3";
import useFetchRewardInfo, {
  RewardInfo,
} from "src/lib/hooks/useFetchRewardInfo";
import RewardPopup from "@components/common/RewardPopup";
import { setAllTicketsRewardRx, setTotalRewardRx } from "@redux/rewardState";
import PopupCore from "@components/common/StatusPopup/PopupCore";
import { BuyTicketPopup } from "@components/common/BuyTicketPopup";
import LoadingPopup from "@components/common/LoadingPopup";
import useFetchHERALotteryInfo from "src/lib/hooks/LotteryWithHera/useFetchHERALotteryInfo";
import { AbiItem } from "ethereum-multicall/dist/esm/models";
import LotteryContracts from "src/lib/class/LotteryContracts";
import useFetchHegemLotteryInfo from "src/lib/hooks/LotteryWithHera/useFetchHegemLotteryInfo";
import lotteryContracts from "src/lib/contract/lotteryContracts";
type Props = {};
interface TicketWithBracket extends Ticket {
  bracket: number;
}
export interface TicketWithReward extends RewardInfo {
  ticket: TicketWithBracket;
}
/**
 * @RULE1 trừ 1 đơn vị paginate cho load history data
 * @RULE2 đơn vị paginate cho load latest giữ nguyên
 * @currentLotteryId lottery ID cho paginate
 * @latestLotteryId lottery ID mới nhất get từ contract
 */
export default function ProcessHERALotteryDataCpn({}: Props) {
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
  const historyPersonalData = useSelector(
    (state) => state.globalState.historyPersonalData
  );
  const triggerLatestDataUseEff = useSelector(
    (state) => state.triggerState.triggerLatestDataUseEff
  );

  useEffect(() => {
    const getCurrentRound = async () => {
      // init lotteries contracts
      const { hegem: hegemLotteryContract, HERA: HERALotteryContract } =
        lotteryContracts;

      // get latest lotteries id
      const lotteryIds = {
        hegem_contract: await hegemLotteryContract.methods
          .viewCurrentLotteryId()
          .call(),
        HERA_contract: await HERALotteryContract.methods
          .viewCurrentLotteryId()
          .call(),
      };

      // fetch max tickets can buy for lottery with HERA
      const maxBuyTickets = {
        HERA: await HERALotteryContract.methods
          .maxNumberTicketsPerBuyOrClaim()
          .call(),
      };

      console.log({
        hegemLotteryId: lotteryIds.hegem_contract,
        HERALotteryId: lotteryIds.HERA_contract,
        maxBuyTickets: maxBuyTickets.HERA,
      });

      // set lotteries id to store
      dispatch(setCurrentLotteryId(parseInt(lotteryIds.hegem_contract))); // buy with HERA
      dispatch(setlatestLotteryId(parseInt(lotteryIds.hegem_contract))); // buy with HERA
      dispatch(setMaxAmountCanBuy(maxBuyTickets.HERA)); // buy with HERA
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
        // console.log(latestLotteryId);
        dispatch(setLoadinglatestLotteryData(true));
        const data = await useFetchHERALotteryInfo(latestLotteryId);
        // const data = await useFetchHegemLotteryInfo(latestLotteryId);
        dispatch(setLoadinglatestLotteryData(false));
        dispatch(setlatestLotteryData(data));
      }
    }
    getInfo();
  }, [latestLotteryId, triggerLatestDataUseEff]);

  // useEffect(() => {
  //   /**
  //    * -> load paginate history data
  //    */
  //   async function getInfo() {
  //     if (currentLotteryId) {
  //       // console.log(currentLotteryId);
  //       dispatch(setLoadingHistoryLotteryData(true));
  //       const data = await useFetchHERALotteryInfo(currentLotteryId - 1);
  //       dispatch(setLoadingHistoryLotteryData(false));
  //       dispatch(setHistoryLotteryData(data));
  //     }
  //   }
  //   getInfo();
  // }, [currentLotteryId]);

  // useEffect(() => {
  //   /**
  //    * -> load latest personal round info
  //    */
  //   async function getInfo() {
  //     if (address && latestLotteryId) {
  //       const data = await useFetchPersonalInfo(latestLotteryId, address);
  //       dispatch(setlatestPersonalData(data));
  //     }
  //   }
  //   getInfo();
  // }, [address, latestLotteryId, triggerLatestDataUseEff]);

  // useEffect(() => {
  //   /**
  //    * -> load history personal round info
  //    */
  //   async function getInfo() {
  //     // console.log("test");
  //     if (address && currentLotteryId) {
  //       const data = await useFetchPersonalInfo(currentLotteryId - 1, address);
  //       dispatch(setHistoryPersonalData(data));
  //     }
  //   }
  //   getInfo();
  // }, [address, currentLotteryId]);

  // useEffect(() => {
  //   /**
  //    * -> Cái này để xử lý data so sánh vé user với số trúng các thứ
  //    * -> Mỗi lần paginate history sẽ gọi cái này
  //    */
  //   async function processData() {
  //     const finalNumberArr = selectedLotteryData?.finalNumber.split("");
  //     let allTicketsStatus = [] as TicketWithBracket[];
  //     let allTicketsReward = [] as TicketWithReward[];
  //     let totalReward: RewardInfo = {
  //       hegemReward: 0,
  //       heraReward: 0,
  //     };
  //     historyPersonalData?.ticketsObj.map((ticketObj: Ticket) => {
  //       const tempBracket = [false, false, false, false];
  //       for (let i = 0; i < ticketObj.ticketNumber.split("").length; i++) {
  //         if (finalNumberArr[i] === ticketObj.ticketNumber[i]) {
  //           tempBracket[i] = true;
  //         } else {
  //           break;
  //         }
  //       }
  //       if (tempBracket.includes(true)) {
  //         const bracket = tempBracket.filter((x: boolean) => x === true).length;
  //         allTicketsStatus.push({ ...ticketObj, bracket: bracket - 1 });
  //       }
  //     });
  //     dispatch(setNumberOfWinningTicket(allTicketsStatus));

  //     const processGetAllRewardPromises = (
  //       arr: TicketWithBracket[]
  //     ): Promise<TicketWithReward[]> => {
  //       const rewardPromises = arr.map(
  //         async (ticketObject: TicketWithBracket) => {
  //           const dataReward = await useFetchRewardInfo(
  //             currentLotteryId - 1,
  //             ticketObject.ticketId,
  //             ticketObject.bracket
  //           );
  //           // console.log(dataReward);
  //           const dataTicketWithReward: TicketWithReward = {
  //             ticket: ticketObject,
  //             hegemReward: dataReward.hegemReward,
  //             heraReward: dataReward.heraReward,
  //           };
  //           return dataTicketWithReward;
  //         }
  //       );
  //       return Promise.all(rewardPromises);
  //     };
  //     allTicketsReward = await processGetAllRewardPromises(allTicketsStatus);

  //     // console.log(allTicketsReward);
  //     dispatch(setAllTicketsRewardRx(allTicketsReward));
  //     allTicketsReward.map((twr: TicketWithReward) => {
  //       totalReward.hegemReward = totalReward.hegemReward + twr.hegemReward;
  //       totalReward.heraReward = totalReward.heraReward + twr.heraReward;
  //     });
  //     // console.log(totalReward);
  //     dispatch(setTotalRewardRx(totalReward));
  //   }
  //   processData();
  // }, [historyPersonalData, selectedLotteryData]);

  return (
    <>
      <BuyTicketPopup />
      <PersonalLatestPopup />
      <PersonalHistoryPopup />
      <RewardPopup />
      <PopupCore />
      <LoadingPopup />
    </>
  );
}
