import Web3 from "web3";
import BigNumber from "bignumber.js";
import { CHAIN_ID, LOTTERY_CONTRACT, HEGEM_ADDRESS } from "../../config/index";
import hegemABI from "src/lib/contract/hegemABI.abi.json";
import lotteryABI from "src/lib/contract/lotteryABI.abi.json";

export default class WalletUtils {
  web3: any;
  address: string | null;
  currentBalance: any | null;
  provider: any | null;
  userAgreement: boolean;
  error: boolean;
  balance: number;
  constructor() {
    this.web3 = null;
    this.address = null;
    this.currentBalance = null;
    this.provider = null;
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
          this.currentBalance = new BigNumber(
            await this.web3.eth.getBalance(addresses[0])
          );
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
          this.currentBalance = new BigNumber(
            await this.web3.eth.getBalance(addresses[0])
          );
          this.address = addresses[0];
        } catch (error) {
          this.error = true;
          this.web3 = null;
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
    const contract = new this.web3.eth.Contract(hegemABI, HEGEM_ADDRESS);
    const totalSupply = await contract.methods.totalSupply().call();
    const executeApproveResult = await contract.methods
      .approve(LOTTERY_CONTRACT, totalSupply)
      .send({ from: this.address })
      .on("transactionHash", (hash: any) => {
        callback({
          status: "EXECUTE_APPROVE_SUBMIT",
          txID: hash,
        });
      })
      .on("error", (error: any) => {
        console.log(error);
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
        console.log(err);
        callback({ status: "EXECUTE_APPROVE_FAIL", error: err.message });
      });
    return executeApproveResult;
  };

  getAllowance = async () => {
    const contract = new this.web3.eth.Contract(hegemABI, HEGEM_ADDRESS);
    const lotteryAllowance = await contract.methods
      .allowance(this.address, LOTTERY_CONTRACT)
      .call();
    return lotteryAllowance;
  };

  getHegemBalance = async () => {
    const contract = new this.web3.eth.Contract(hegemABI, HEGEM_ADDRESS);
    const balance = new BigNumber(
      await contract.methods.balanceOf(this.address).call()
    );
    this.balance = this.web3.utils.fromWei(`${balance.toFixed()}`, "ether");
    return this.web3.utils.fromWei(`${balance.toFixed()}`, "ether");
  };

  buyTicket = async (
    { ticketNumbers }: { ticketNumbers: [] },
    callback: any
  ) => {
    const contract = new this.web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
    const currentPoolId = await contract.methods.viewCurrentLotteryId().call();
    const executeBuyTicket = await contract.methods
      .buyTickets(currentPoolId, ticketNumbers)
      .send({ from: this.address })
      .on("transactionHash", (hash: any) => {
        callback({
          status: "EXECUTE_BUY_TICKET_SUBMIT",
          txID: hash,
        });
      })
      .on("error", (error: any) => {
        console.log(error);
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
        console.log(err);
        callback({ status: "EXECUTE_BUY_TICKET_FAIL", error: err.message });
      });
    return executeBuyTicket;
  };

  claimReward = async (
    {
      lotteryId,
      ticketIds,
      brackets,
    }: { lotteryId: number; ticketIds: []; brackets: [] },
    callback: any
  ) => {
    const contract = new this.web3.eth.Contract(lotteryABI, LOTTERY_CONTRACT);
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
        console.log(error);
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
        console.log(err);
        callback({ status: "EXECUTE_CLAIM_TICKET_FAIL", error: err.message });
      });
    return executeBuyTicket;
  };
}
