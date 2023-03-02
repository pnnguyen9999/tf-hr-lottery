import { setOpenHistoryPersonalTicketInfo } from "@redux/globalState";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

export default function PersonalHistory({}: Props) {
  const dispatch = useDispatch();
  const historyPersonalData = useSelector((state) => state.globalState.historyPersonalData);

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-12 col-sm-3 fnt-s3 fnt-b cl-w ">Your Ticket</div>
        <div className="col d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-start flex-column">
            <div className="fnt-s1 cl-w">
              You Have <span className="fnt-b cl-yl">{historyPersonalData?.numberOfTickets} Ticket</span> This Round
            </div>
            <u className="fnt-s1 cl-br cursor-pointer" onClick={() => dispatch(setOpenHistoryPersonalTicketInfo(true))}>
              View your tickets
            </u>
          </div>
        </div>
      </div>
    </div>
  );
}
