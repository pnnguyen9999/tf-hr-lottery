import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import _ from "lodash";
import Web3 from "web3";

export interface Ticket {
  ticketId: string;
  ticketNumber: string;
}
export interface PersonalData {
  results: {};
  round: number;
  numberOfTickets: number;
  tickets: string[];
  ticketsObj: Ticket[];
  ticketClaimStatus: boolean[];
}

const useFetchPersonalInfo = async (lotteryId: number, address: string): Promise<PersonalData> => {
  const getLotteryData = async (_lotteryId: number, _address: string): Promise<any> => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const data = await contract.methods
      .viewUserInfoForLotteryId(_address, _lotteryId, 0, 10000)
      .call();
    return data;
  };

  const results = await getLotteryData(lotteryId, address);
  // console.log(results);
  const numberOfTickets = parseInt(results[3]);
  const round = lotteryId;

  const tickets = results[1].map((number: number) =>
    _.reverse(number.toString().split("")).join("").slice(0, -1)
  );

  const ticketsObj = results[1].map((number: number, index: number) => {
    return {
      ticketId: results[0][index],
      ticketNumber: _.reverse(number.toString().split("")).join("").slice(0, -1),
    };
  });

  const ticketClaimStatus = results[2];
  //   const tickets = ["0014", "0127", "0064", "1064", "0264"];
  //   const ticketsObj = [
  //     { ticketId: "10", ticketNumber: "0014" },
  //     { ticketId: "11", ticketNumber: "0127" },
  //     { ticketId: "12", ticketNumber: "0064" },
  //     { ticketId: "13", ticketNumber: "1064" },
  //     { ticketId: "14", ticketNumber: "0264" },
  //   ];
  // console.log(ticketsObj);

  return {
    results,
    round,
    numberOfTickets,
    tickets,
    ticketsObj,
    ticketClaimStatus,
  };
};

export default useFetchPersonalInfo;
