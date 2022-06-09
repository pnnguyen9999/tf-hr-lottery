import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import _ from "lodash";
import Web3 from "web3";
import moment from "moment";

export interface LotteryData {
  results: [];
  finalNumber: string;
  amountCollectedInHegem: number;
  amountCollectedInHera: number;
  coinPerBracket: [];
  drawnTime: string;
}

const useFetchContractInfo = async (
  lotteryId: number
): Promise<LotteryData> => {
  const getLotteryData = async (id: number): Promise<any> => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const data = await contract.methods.viewLottery(id).call();
    return data;
  };
  const results = await getLotteryData(lotteryId);

  // const finalNumber = parseInt(
  //   _.reverse((results[14] - 10000).toString().split("")).join("")
  // );

  const finalNumberData = _.reverse(
    (results[14] - 10000).toString().split("")
  ).join("");
  let finalNumber = "";
  if (finalNumberData.length !== 4) {
    finalNumber = "";
  } else {
    finalNumber = finalNumberData;
  }

  const amountCollectedInHegem = parseFloat(
    Web3.utils.fromWei(results[12], "ether")
  );
  const amountCollectedInHera = parseFloat(
    Web3.utils.fromWei(results[13], "ether")
  );

  const coinPerBracket = results[4].map((number: any, index: number) => {
    return {
      index,
      hegem: ((parseFloat(number) / 100) * amountCollectedInHegem) / 100,
      hera:
        ((parseFloat(results[5][index]) / 100) * amountCollectedInHera) / 100,
      countWinners: results[9][index],
    };
  });

  const drawnTime = moment.unix(results[2]).format("ll HH:mm:ss");

  return {
    results,
    finalNumber,
    amountCollectedInHegem,
    amountCollectedInHera,
    coinPerBracket,
    drawnTime,
  };
};

export default useFetchContractInfo;
