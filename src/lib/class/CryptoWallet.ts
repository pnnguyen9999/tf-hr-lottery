import Web3 from "web3";
import BigNumber from "bignumber.js";
import {
  CHAIN_ID,
  HERA_LOTTERY_CONTRACT,
  HERA_ADDRESS,
} from "../../config/index";
import heraABI from "src/lib/contract/heraABI.abi.json";
import HERAlotteryABI from "src/lib/contract/lotteryHeraABI.abi.json";
import { AbiItem } from "ethereum-multicall/dist/esm/models/abi-item";

export default class WalletUtils {
  web3: Web3;
  address: string | null;
  currentBalance: BigNumber | null;
  userAgreement: boolean;
  error: boolean;
  balance: number | string;
  constructor() {
    this.web3 = null as unknown as Web3;
    this.address = null;
    this.currentBalance = null;
    this.userAgreement = false;
    this.error = false;
    this.balance = 0;
  }

  connect = async () => {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const envCheck =
        window.ethereum.networkVersion === CHAIN_ID ||
        (!window.ethereum.chainId && !window.ethereum.networkVersion);
      if (!envCheck) {
        const chainID = await this.web3.utils.numberToHex(CHAIN_ID);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainID }],
          });
          this.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();

          const addresses = await this.web3.eth.getAccounts();
          this.currentBalance = new BigNumber(await this.web3.eth.getBalance(addresses[0]));
          this.address = addresses[0];
        } catch (err) {
          await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [
              {
                eth_accounts: {},
              },
            ],
          });
          localStorage.setItem("disconnected", "true");
          return false;
        }
      } else {
        try {
          const addresses = await this.web3.eth.getAccounts();
          this.currentBalance = new BigNumber(await this.web3.eth.getBalance(addresses[0]));
          this.address = addresses[0];
        } catch (error) {
          this.error = true;
          this.web3 = null as unknown as Web3;
        }
      }
    } else {
      return false;
    }
  };

  getCurrentAddress = () => {
    if (this.address) {
      return this.address;
    } else {
      return false;
    }
  };

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
        // console.log(err);
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

  buyTicket = async ({ ticketNumbers }: { ticketNumbers: [] }, callback: any) => {
    const lotteryContract = new this.web3.eth.Contract(HERAlotteryABI as AbiItem[], HERA_LOTTERY_CONTRACT);
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
    { lotteryId, ticketIds, brackets }: { lotteryId: number; ticketIds: []; brackets: [] },
    callback: any
  ) => {
    const contract = new this.web3.eth.Contract(HERAlotteryABI as AbiItem[], HERA_LOTTERY_CONTRACT);
    const executeBuyTicket = await contract.methods
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
    return executeBuyTicket;
  };
}
