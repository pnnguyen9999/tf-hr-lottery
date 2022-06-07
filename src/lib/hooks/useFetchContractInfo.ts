import { useEffect } from "react";
import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from "ethereum-multicall";
import { LOTTERY_CONTRACT, RPC_BSC } from "src/config";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";
import _ from "lodash";
import Web3 from "web3";

const multicall = new Multicall({
  nodeUrl: RPC_BSC,
  // multicallCustomContractAddress: "0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D",
  tryAggregate: false,
  // your rest of your config depending on the provider your using.
});

const useFetchContractInfo = async (lotteryId: number) => {
  const getLotteryData = async (id: number) => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const data = await contract.methods.viewLottery(id).call();
    return data;
  };
  const results = await getLotteryData(lotteryId);

  const finalNumber = parseInt(
    _.reverse((results[14] - 10000).toString().split("")).join("")
  );

  const amountCollectedInHegem = parseFloat(
    Web3.utils.fromWei(results[12], "ether")
  );
  const amountCollectedInHera = parseFloat(
    Web3.utils.fromWei(results[13], "ether")
  );
  const coinPerBracket = results[7].map((number: any, index: number) => {
    return {
      index,
      hegem: Web3.utils.fromWei(number, "ether"),
      hera: Web3.utils.fromWei(results[8][index], "ether"),
    };
  });

  console.log(finalNumber);
  // const contractCallContext: ContractCallContext[] = [
  //   {
  //     reference: "LOTTERY_CONTRACT",
  //     contractAddress: LOTTERY_CONTRACT,
  //     abi: lotteryABI,
  //     calls: [
  //       {
  //         reference: "viewLottery",
  //         methodName: "viewLottery",
  //         methodParameters: [lotteryId],
  //       },
  //     ],
  //   },
  // ];
  // const results: ContractCallResults = await multicall.call(
  //   contractCallContext
  // );
  // // console.log(results.results);
  // const LOTTERY_CONTRACT_RES =
  //   results.results.LOTTERY_CONTRACT.callsReturnContext[0].returnValues;

  // const finalNumber = parseInt(
  //   _.reverse((LOTTERY_CONTRACT_RES[14] - 10000).toString().split("")).join("")
  // );

  // const amountCollectedInHegem = parseFloat(
  //   Web3.utils.fromWei(LOTTERY_CONTRACT_RES[12].hex, "ether")
  // );
  // const amountCollectedInHera = parseFloat(
  //   Web3.utils.fromWei(LOTTERY_CONTRACT_RES[13].hex, "ether")
  // );
  // const coinPerBracket = LOTTERY_CONTRACT_RES[7].map(
  //   (number: any, index: number) => {
  //     return {
  //       index,
  //       hegem: Web3.utils.fromWei(number.hex, "ether"),
  //       hera: Web3.utils.fromWei(LOTTERY_CONTRACT_RES[8][index].hex, "ether"),
  //     };
  //   }
  // );

  // console.log(coinPerBracket);
  return {
    results,
    finalNumber,
    amountCollectedInHegem,
    amountCollectedInHera,
    coinPerBracket,
  };
  // console.log(results.results);
};

export default useFetchContractInfo;
