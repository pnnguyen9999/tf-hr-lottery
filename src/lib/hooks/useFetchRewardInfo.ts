import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import _ from "lodash";
import Web3 from "web3";

export interface RewardInfo {
  hegemReward: number;
  heraReward: number;
}
const useFetchRewardInfo = async (lotteryId: number, ticketId: string, bracket: number): Promise<RewardInfo> => {
  const getRewardData = async (_lotteryId: number, _ticketId: string, _bracket: number): Promise<any> => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const data = await contract.methods.viewRewardsForTicketId(_lotteryId, _ticketId, _bracket).call();
    return data;
  };

  const results = await getRewardData(lotteryId, ticketId, bracket);

  const hegemReward = parseFloat(Web3.utils.fromWei(results[0], "ether"));
  const heraReward = parseFloat(Web3.utils.fromWei(results[1], "ether"));

  // console.log("useFetchRewardInfo Hegem round = ", lotteryId, "tickedId=", ticketId, "bracket=", bracket, {
  //   results,
  //   hegemReward,
  //   heraReward,
  // });

  return {
    hegemReward,
    heraReward,
  };
};

export default useFetchRewardInfo;
