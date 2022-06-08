import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import _ from "lodash";
import Web3 from "web3";

interface Ticket {
  ticketId: string;
  ticketNumber: string;
}
export interface PersonalData {
  results: {};
  round: number;
  numberOfTickets: number;
  tickets: string[];
  ticketsObj: Ticket[];
}

const useFetchPersonalInfo = async (
  lotteryId: number,
  address: string
): Promise<PersonalData> => {
  const getLotteryData = async (
    _lotteryId: number,
    _address: string
  ): Promise<any> => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const data = await contract.methods
      .viewUserInfoForLotteryId(_address, _lotteryId, 0, 10000)
      .call();
    return data;
  };
  const results = await getLotteryData(lotteryId, address);
  console.log(results);
  const numberOfTickets = parseInt(results[3]);
  const round = lotteryId;

  const tickets = results[1].map((number: number) =>
    _.reverse(number.toString().split("")).join("").slice(0, -1)
  );

  const ticketsObj = results[1].map((number: number, index: number) => {
    return {
      ticketId: results[0][index],
      ticketNumber: _.reverse(number.toString().split(""))
        .join("")
        .slice(0, -1),
    };
  });
  console.log(ticketsObj);

  return {
    results,
    round,
    numberOfTickets,
    tickets,
    ticketsObj,
  };
};

export default useFetchPersonalInfo;
