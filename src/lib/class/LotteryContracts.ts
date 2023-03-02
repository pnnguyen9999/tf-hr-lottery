import { AbiItem } from 'ethereum-multicall/dist/esm/models';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import {
  LOTTERY_CONTRACT as LOTTERY_HEGEM_CONTRACT,
  HERA_LOTTERY_CONTRACT as LOTTERY_HERA_CONTRACT,
  RPC_BSC,
} from 'src/config';
import lotteryHegemABI from 'src/lib/contract/lotteryABI.abi.json';
import lotteryHeraABI from 'src/lib/contract/lotteryHeraABI.abi.json';

class LotteryContracts {
  HERA: Contract;
  hegem: Contract;

  constructor(web3 = new Web3(RPC_BSC)) {
    this.hegem = new web3.eth.Contract(lotteryHegemABI as AbiItem[], LOTTERY_HEGEM_CONTRACT);
    this.HERA = new web3.eth.Contract(lotteryHeraABI as AbiItem[], LOTTERY_HERA_CONTRACT);
  }
}

const lotteryContracts = new LotteryContracts();
export const getLotteryContracts = () => lotteryContracts;
export default LotteryContracts;
