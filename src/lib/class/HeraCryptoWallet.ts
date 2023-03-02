import BigNumber from "bignumber.js";
import {
  CHAIN_ID,
  LOTTERY_CONTRACT as HEGEM_LOTTERY_CONTRACT,
  HERA_LOTTERY_CONTRACT,
  HERA_ADDRESS,
} from "../../config/index";
import heraABI from "src/lib/contract/heraABI.abi.json";
import HERAlotteryABI from "src/lib/contract/lotteryHeraABI.abi.json";
import { LotteryTokenUnit } from "src/@types";
import hegemLotteryABI from "src/lib/contract/lotteryABI.abi.json";
import WalletUtils from "./CryptoWallet";
import { AbiItem } from "ethereum-multicall/dist/esm/models";

export default class HeraWalletUtils extends WalletUtils {
  
  approveLotteryContract = async (callback: any) => {
    const tokenContract = new this.web3.eth.Contract(heraABI as AbiItem[], HERA_ADDRESS);
    const totalSupply = await tokenContract.methods.totalSupply().call();
    const executeApproveResult = await tokenContract.methods
      .approve(HERA_LOTTERY_CONTRACT, totalSupply)
      .send({ from: this.address })
      .on("transactionHash", (hash: any) => {
        callback({
          status: "EXECUTE_APPROVE_SUBMIT",
          txID: hash,
        });
      })
      .on("error", (error: any) => {
        callback({
          status: "EXECUTE_APPROVE_FAIL",
          error: error.message,
        });
      })
      .then(async (receipt: any) => {
        if (receipt.status === true) {
          callback({
            status: "EXECUTE_APPROVE_SUCCESS",
            txID: receipt.transactionHash,
          });
        }
      })
      .catch((err: any) => {
        callback({ status: "EXECUTE_APPROVE_FAIL", error: err.message });
      });
    return executeApproveResult;
  };

  getAllowanceHERA = async () => {
    const HERATokenContract = new this.web3.eth.Contract(heraABI as AbiItem[], HERA_ADDRESS);
    const lotteryAllowance = await HERATokenContract.methods
      .allowance(this.address, HERA_LOTTERY_CONTRACT)
      .call();
    return lotteryAllowance;
  };

  getHERABalance = async () => {
    const HERATokenContract = new this.web3.eth.Contract(heraABI as AbiItem[], HERA_ADDRESS);
    const balance = new BigNumber(await HERATokenContract.methods.balanceOf(this.address).call());
    const balanceValue = this.web3.utils.fromWei(`${balance.toFixed()}`, "ether");

    this.balance = balanceValue;
    return balanceValue;
  };

  buyTicket = async (
    { lottery = "hera", ticketNumbers }: { ticketNumbers: []; lottery?: LotteryTokenUnit },
    callback: any
  ) => {
    const lotteryContract = (lottery === "hegem") ? 
          new this.web3.eth.Contract(hegemLotteryABI as AbiItem[], HEGEM_LOTTERY_CONTRACT) : 
          new this.web3.eth.Contract(HERAlotteryABI as AbiItem[], HERA_LOTTERY_CONTRACT);

    const currentPoolId = await lotteryContract.methods.viewCurrentLotteryId().call();
    const executeBuyTicket = await lotteryContract.methods
      .buyTickets(currentPoolId, ticketNumbers)
      .send({ from: this.address })
      .on("transactionHash", (hash: any) => {
        callback({
          status: "EXECUTE_BUY_TICKET_SUBMIT",
          txID: hash,
        });
      })
      .on("error", (error: any) => {
        callback({
          status: "EXECUTE_BUY_TICKET_FAIL",
          error: error.message,
        });
      })
      .then(async (receipt: any) => {
        if (receipt.status === true) {
          callback({
            status: "EXECUTE_BUY_TICKET_SUCCESS",
            txID: receipt.transactionHash,
          });
        }
      })
      .catch((err: any) => {
        callback({ status: "EXECUTE_BUY_TICKET_FAIL", error: err.message });
      });
    return executeBuyTicket;
  };

  claimReward = async (
    {
      lotteryId,
      ticketIds,
      brackets,
      lottery = "hera",
    }: { lotteryId: number; ticketIds: []; brackets: []; lottery?: LotteryTokenUnit },
    callback: any
  ) => {
    const contract = (lottery === "hegem") ? 
    new this.web3.eth.Contract(hegemLotteryABI as AbiItem[], HEGEM_LOTTERY_CONTRACT) : 
    new this.web3.eth.Contract(HERAlotteryABI as AbiItem[], HERA_LOTTERY_CONTRACT);

    const executeClaimReward = await contract.methods
      .claimTickets(lotteryId, ticketIds, brackets)
      .send({ from: this.address })
      .on("transactionHash", (hash: any) => {
        callback({
          status: "EXECUTE_CLAIM_TICKET_SUBMIT",
          txID: hash,
        });
      })
      .on("error", (error: any) => {
        callback({
          status: "EXECUTE_CLAIM_TICKET_FAIL",
          error: error.message,
        });
      })
      .then(async (receipt: any) => {
        if (receipt.status === true) {
          callback({
            status: "EXECUTE_CLAIM_TICKET_SUCCESS",
            txID: receipt.transactionHash,
          });
        }
      })
      .catch((err: any) => {
        callback({ status: "EXECUTE_CLAIM_TICKET_FAIL", error: err.message });
      });
    return executeClaimReward;
  };
}
