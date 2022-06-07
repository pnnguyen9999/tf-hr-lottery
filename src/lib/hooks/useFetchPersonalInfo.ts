import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import _ from "lodash";
import Web3 from "web3";
import moment from "moment";

const useFetchPersonalInfo = async (lotterId: number, address: string) => {
  const getLotteryData = async (
    _lotterId: number,
    _address: string
  ): Promise<any> => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const data = await contract.methods
      .viewUserInfoForLotteryId(_address, _lotterId, 0, 10000)
      .call();
    return data;
  };
  const results = await getLotteryData(lotterId, address);
  console.log(results);
  const numberOfTickets = results[3];
  const round = lotterId;
  const tickets = results[1].map((number: any) =>
    parseInt(_.reverse((number - 10000).toString().split("")).join(""))
  );
  console.log(tickets);
  return {
    results,
    round,
    numberOfTickets,
    tickets,
  };
};

export default useFetchPersonalInfo;
