import PersonalHistoryPopup from "@components/common/PersonalTicketInfoPopup/PersonalHistoryPopup";
import PersonalLatestPopup from "@components/common/PersonalTicketInfoPopup/PersonalLatestPopup";
import {
  setCurrentLotteryId,
  setHistoryLotteryData,
  setHistoryPersonalData,
  setlatestHegemLotteryData,
  setlatestHegemLotteryId,
  setlatestLotteryData,
  setlatestLotteryId,
  setlatestPersonalData,
  setLoadingHistoryLotteryData,
  setLoadinglatestLotteryData,
  setMaxAmountCanBuy,
  setNumberOfWinningTicket,
} from "@redux/globalState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useFetchContractInfo from "src/lib/hooks/useFetchContractInfo";
import { BuyTicketPopup } from "@components/common/BuyTicketPopup";
import LoadingPopup from "@components/common/LoadingPopup";
import RewardPopup from "@components/common/RewardPopup";
import PopupCore from "@components/common/StatusPopup/PopupCore";
import { getLotteryContracts } from "src/lib/class/LotteryContracts";
import useFetchHegemLotteryInfo from "src/lib/hooks/LotteryWithHera/useFetchHegemLotteryInfo";
import useFetchHERALotteryInfo from "src/lib/hooks/LotteryWithHera/useFetchHERALotteryInfo";
import { LotteryData } from "src/lib/hooks/useFetchContractInfo";
import useFetchHegemPersonalInfo, { Ticket } from "src/lib/hooks/useFetchPersonalInfo";
import useFetchHegemTicketRewardInfo, { RewardInfo } from "src/lib/hooks/useFetchRewardInfo";
import useFetchHERAPersonalInfo from "src/lib/hooks/LotteryWithHera/useFetchHERAPersonalInfo";
import { setAllTicketsRewardRx, setTotalRewardRx } from "@redux/rewardState";
import useFetchHERATicketRewardInfo from "src/lib/hooks/LotteryWithHera/useFetchHERARewardInfo";
type Props = {};
interface TicketWithBracket extends Ticket {
  bracket: number;
}
export interface TicketWithReward extends RewardInfo {
  ticket: TicketWithBracket;
}
/**
 * @RULE1 //// trừ 1 đơn vị paginate cho load history data
 * -> không trừ
 * @RULE2 đơn vị paginate cho load latest giữ nguyên
 * @currentLotteryId lottery ID cho paginate
 * @latestLotteryId lottery ID mới nhất get từ contract
 */
export default function ProcessHERALotteryDataCpn({}: Props) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const latestLotteryId = useSelector((state) => state.globalState.latestLotteryId);
  const latestHegemLotteryId = useSelector((state) => state.globalState.latestHegemLotteryId);
  const currentLotteryId = useSelector((state) => state.globalState.currentLotteryId);
  const selectedLotteryData = useSelector((state) => state.globalState.historyLotteryData);
  const historyPersonalData = useSelector((state) => state.globalState.historyPersonalData);
  const triggerLatestDataUseEff = useSelector((state) => state.triggerState.triggerLatestDataUseEff);
  const triggerCurrentPersonalDataUseEff = useSelector((state) => state.triggerState.triggerCurrentPersonalDataUseEff);

  const currentHistoryLottery = useSelector((state) => state.globalState.currentHistoryLottery);

  useEffect(() => {
    const getLotteryRound = async () => {
      // init lotteries contracts
      const { hegem: hegemLotteryContract, HERA: HERALotteryContract } = getLotteryContracts();

      // get latest lotteries id
      const latestLotteryIds = {
        hegem_contract: (await hegemLotteryContract.methods.viewCurrentLotteryId().call()) as string,
        HERA_contract: (await HERALotteryContract.methods.viewCurrentLotteryId().call()) as string,
      };

      // fetch max tickets can buy for lottery with HERA
      const maxBuyTickets = {
        HERA: await HERALotteryContract.methods.maxNumberTicketsPerBuyOrClaim().call(),
      };

      // console.log({
      //   hegemLotteryId: latestLotteryIds.hegem_contract,
      //   HERALotteryId: latestLotteryIds.HERA_contract,
      //   maxBuyTickets: maxBuyTickets.HERA,
      // });

      // set lotteries id to store
      dispatch(setCurrentLotteryId(parseInt(latestLotteryIds.HERA_contract) - 1)); // buy with HERA
      dispatch(setlatestLotteryId(parseInt(latestLotteryIds.HERA_contract))); // buy with HERA
      dispatch(
        setlatestHegemLotteryId(parseInt(latestLotteryIds.hegem_contract)) // buy with Hegem
      );
      dispatch(setMaxAmountCanBuy(maxBuyTickets.HERA)); // buy with HERA
    };
    // if (window) {
    getLotteryRound();
    // }
  }, []);

  // effect for updateLatestLotteryInfo
  useEffect(() => {
    /**
     * -> load latest data
     */
    const updateLatestLotteryInfo = async () => {
      dispatch(setLoadinglatestLotteryData(true));
      if (latestLotteryId) {
        const HERALotteryData = await useFetchHERALotteryInfo(latestLotteryId);
        dispatch(setlatestLotteryData(HERALotteryData as LotteryData));
        // console.log({ HERALotteryData });
      }
      if (latestHegemLotteryId) {
        const hegemLotteryData = await useFetchHegemLotteryInfo(latestHegemLotteryId);
        dispatch(setlatestHegemLotteryData(hegemLotteryData));
        // console.log({ hegemLotteryData });
      }
      dispatch(setLoadinglatestLotteryData(false));
    };

    updateLatestLotteryInfo();
  }, [latestLotteryId, latestHegemLotteryId, triggerLatestDataUseEff]);

  useEffect(() => {
    /**
     * -> load lottery history round data
     */
    const getInfo = async () => {
      if (currentLotteryId) {
        // console.log(currentLotteryId);
        dispatch(setLoadingHistoryLotteryData(true));
        const lotteryInfoFetcher =
          currentHistoryLottery === "hegem" ? useFetchHegemLotteryInfo : useFetchHERALotteryInfo;

        const data = await lotteryInfoFetcher(currentLotteryId);
        // console.log("load paginate history data", { currentLotteryId, data });
        dispatch(setLoadingHistoryLotteryData(false));
        dispatch(setHistoryLotteryData(data));
      }
    };
    getInfo();
  }, [currentLotteryId, currentHistoryLottery]);

  useEffect(() => {
    /**
     * -> load latest personal round info
     */
    async function getInfo() {
      if (address && latestLotteryId) {
        const data = await useFetchHERAPersonalInfo(latestLotteryId, address);
        // console.log("useFetchHERAPersonalInfo", latestLotteryId, address, data);
        dispatch(setlatestPersonalData(data));
      }
    }
    getInfo();
  }, [address, latestLotteryId, triggerLatestDataUseEff]);

  useEffect(() => {
    /**
     * -> load history personal round info
     */
    async function getInfo() {
      // console.log("test");
      if (address && currentLotteryId) {
        const personalInfoFetcher =
          currentHistoryLottery === "hegem" ? useFetchHegemPersonalInfo : useFetchHERAPersonalInfo;

        const data = await personalInfoFetcher(currentLotteryId, address);
        // console.log(
        //   `address: ${address} history 🕖 round info  ${currentHistoryLottery} round=`,
        //   currentLotteryId,
        //   data
        // );

        dispatch(setHistoryPersonalData(data));
      }
    }
    getInfo();
  }, [address, currentLotteryId, currentHistoryLottery, triggerCurrentPersonalDataUseEff]);

  useEffect(() => {
    /**
     * -> Cái này để xử lý data so sánh vé user với số trúng các thứ
     * -> Mỗi lần paginate history sẽ gọi cái này
     */
    async function processData() {
      const finalNumberArr = selectedLotteryData?.finalNumber.split("");

      // filter out winning tickets with _bracket value
      const winningTicketsStatus: TicketWithBracket[] = [];
      const myHistoryTickets: Ticket[] = historyPersonalData?.ticketsObj ?? [];

      // console.log("my history 🕖 all tickets", historyPersonalData);
      for (const ticketObj of myHistoryTickets) {
        const tempBracket = [false, false, false, false];
        for (let i = 0; i < ticketObj.ticketNumber.split("").length; i++) {
          if (finalNumberArr[i] === ticketObj.ticketNumber[i]) {
            tempBracket[i] = true;
          } else {
            break;
          }
        }
        if (tempBracket.includes(true)) {
          const bracket = tempBracket.filter((x: boolean) => x === true).length;
          winningTicketsStatus.push({ ...ticketObj, bracket: bracket - 1 });
        }
      }
      // console.log(
      //   `my winning 🥇 tickets 🎫 statuses at ${currentHistoryLottery} round=`,
      //   currentLotteryId,
      //   "with finalNumber=",
      //   finalNumberArr,
      //   winningTicketsStatus
      // );
      dispatch(setNumberOfWinningTicket(winningTicketsStatus));

      const ticketRewardInfoFetcher =
        currentHistoryLottery === "hegem" ? useFetchHegemTicketRewardInfo : useFetchHERATicketRewardInfo;

      function processGetAllRewardPromises(arr: TicketWithBracket[]): Promise<TicketWithReward[]> {
        const rewardPromises = arr.map(async (ticketObject: TicketWithBracket) => {
          const dataReward: RewardInfo = await ticketRewardInfoFetcher(
            currentLotteryId,
            ticketObject.ticketId,
            ticketObject.bracket
          );
          const dataTicketWithReward: TicketWithReward = {
            ticket: ticketObject,
            hegemReward: dataReward.hegemReward,
            heraReward: dataReward.heraReward,
          };
          return dataTicketWithReward;
        });
        return Promise.all(rewardPromises);
      }
      const allTicketsReward = await processGetAllRewardPromises(winningTicketsStatus);
      dispatch(setAllTicketsRewardRx(allTicketsReward));

      //** calculate totalReward for current history round
      const totalReward: RewardInfo = {
        hegemReward: 0,
        heraReward: 0,
      };
      for (const ticket of allTicketsReward) {
        totalReward.hegemReward = totalReward.hegemReward + ticket.hegemReward;
        totalReward.heraReward = totalReward.heraReward + ticket.heraReward;
      }
      dispatch(setTotalRewardRx(totalReward));
    }
    processData();
  }, [historyPersonalData, selectedLotteryData]);

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
