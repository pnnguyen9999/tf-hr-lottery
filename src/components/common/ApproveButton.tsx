import { setOpenLoadingPopup } from "@redux/globalState";
import { setAllowance } from "@redux/web3";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { HeroButton } from "./HeroButton";

export function ApproveButton() {
  const dispatch = useDispatch();
  const web3data = useSelector((state) => state.web3.utilsWallet);
  const approveContract = async () => {
    await web3data.approveLotteryContract(async (data: any) => {
      if (data.status === "EXECUTE_APPROVE_SUBMIT") {
        dispatch(setOpenLoadingPopup(true));
      } else if (data.status === "EXECUTE_APPROVE_SUCCESS") {
        dispatch(setOpenLoadingPopup(false));
        console.log("approved");
        dispatch(setAllowance(Web3.utils.fromWei(await web3data.getAllowanceHERA(), "ether")));
      } else if (data.status === "EXECUTE_APPROVE_FAIL") {
        console.log("execute fail");
        dispatch(setOpenLoadingPopup(false));
      }
    });
  };
  return <HeroButton text="Approve" action={() => approveContract()} />;
}
