import { getLotteryContracts } from "src/lib/class/LotteryContracts";
import Web3 from "web3";

export interface RewardInfo {
  hegemReward: number;
  heraReward: number;
}
const useFetchHERARewardInfo = async (lotteryId: number, ticketId: string, bracket: number): Promise<RewardInfo> => {
  const getHERARewardData = async (_lotteryId: number, _ticketId: string, _bracket: number): Promise<any> => {
    const lotteryContract = getLotteryContracts();
    const data = await lotteryContract.HERA.methods.viewRewardsForTicketId(_lotteryId, _ticketId, _bracket).call();
    return data;
  };

  const results = await getHERARewardData(lotteryId, ticketId, bracket);

  const hegemReward = 0;
  const heraReward = parseFloat(Web3.utils.fromWei(results, "ether"));

  // console.log("useFetchHERARewardInfo round = ", lotteryId, "tickedId=", ticketId, "bracket=", bracket, {
  //   results,
  //   hegemReward,
  //   heraReward,
  // });

  return {
    hegemReward,
    heraReward,
  };
};

export default useFetchHERARewardInfo;
