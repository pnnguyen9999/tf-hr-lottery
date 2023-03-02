import _ from "lodash";
import moment from "moment";
import { HERA_LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import HERALotteryABI from "src/lib/contract/lotteryHeraABI.abi.json";
import Web3 from "web3";
import { LotteryData } from "../useFetchContractInfo";

type HeraLotteryData = Omit<LotteryData, "amountCollectedInHegem">;

const getHERALotteryData = async (id: number): Promise<any> => {
  const web3 = new Web3(RPC_BSC) as any;
  let contract = new web3.eth.Contract(HERALotteryABI, HERA_LOTTERY_CONTRACT);
  const data = await contract.methods.viewLottery(id).call();
  return data;
};

const useFetchHERALotteryInfo = async (
  lotteryId: number
): Promise<HeraLotteryData> => {
  const results = await getHERALotteryData(lotteryId);
  const viewLotteryMethod = HERALotteryABI.find(
    ({ name }) => name === "viewLottery"
  );
  const viewLotteryOutputsABI = (viewLotteryMethod?.outputs?.[0] as any)
    .components as any[];

  const outputRs = (outputName: string) => {
    // debugger;
    const outputIndex = viewLotteryOutputsABI.findIndex(
      ({ name }) => name === outputName
    );
    return results[outputIndex ?? -1] ?? "";
  };

  const finalNumber = _.reverse(outputRs("finalNumber").toString().split(""))
    .join("")
    .slice(0, -1);

  const amountCollectedInHera = parseFloat(
    Web3.utils.fromWei(outputRs("amountCollectedInHera") as string, "ether")
  );

  const coinPerBracket = outputRs("heraRewardsBreakdown").map(
    (number, index: number) => {
      return {
        index,
        hera: ((parseFloat(number) / 100) * amountCollectedInHera) / 100,
        countWinners: outputRs("countWinnersPerBracket")[index],
      };
    }
  );

  const drawnTime = moment.unix(results[2]).format("ll HH:mm:ss");
  const drawnTimeMoment = moment.unix(results[2]);
  const ticketPrice = parseFloat(Web3.utils.fromWei(results[3], "ether"));
  return {
    results,
    finalNumber,
    amountCollectedInHera,
    coinPerBracket,
    drawnTime,
    drawnTimeMoment,
    ticketPrice,
  };
};

export default useFetchHERALotteryInfo;
