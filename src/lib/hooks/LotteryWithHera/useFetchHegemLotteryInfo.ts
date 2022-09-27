import { LOTTERY_CONTRACT as LOTTERY_HEGEM_CONTRACT, RPC_BSC } from 'src/config';
import hegemLotteryABI from 'src/lib/contract/lotteryABI.abi.json';
import _ from 'lodash';
import Web3 from 'web3';
import moment from 'moment';
import type { LotteryData } from '../useFetchContractInfo';

interface HegemLotteryData extends LotteryData {}

const useFetchHegemLotteryInfo = async (lotteryId: number): Promise<HegemLotteryData> => {
  const getLotteryData = async (id: number): Promise<any> => {
    const web3 = new Web3(RPC_BSC) as any;
    let contract = new web3.eth.Contract(hegemLotteryABI, LOTTERY_HEGEM_CONTRACT);
    const data = await contract.methods.viewLottery(id).call();
    return data;
  };
  const results = await getLotteryData(lotteryId);

  const finalNumber = _.reverse(results[14].toString().split('')).join('').slice(0, -1);

  const amountCollectedInHegem = parseFloat(Web3.utils.fromWei(results[12], 'ether'));
  const amountCollectedInHera = parseFloat(Web3.utils.fromWei(results[13], 'ether'));

  const coinPerBracket = results[4].map((number: any, index: number) => {
    return {
      index,
      hegem: ((parseFloat(number) / 100) * amountCollectedInHegem) / 100,
      hera: ((parseFloat(results[5][index]) / 100) * amountCollectedInHera) / 100,
      countWinners: results[9][index],
    };
  });

  const drawnTime = moment.unix(results[2]).format('ll HH:mm:ss');
  const drawnTimeMoment = moment.unix(results[2]);
  const ticketPrice = parseFloat(Web3.utils.fromWei(results[3], 'ether'));
  return {
    results,
    finalNumber,
    amountCollectedInHegem,
    amountCollectedInHera,
    coinPerBracket,
    drawnTime,
    drawnTimeMoment,
    ticketPrice,
  };
};

export default useFetchHegemLotteryInfo;
