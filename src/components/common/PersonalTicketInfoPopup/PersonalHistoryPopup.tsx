import { setOpenHistoryPersonalTicketInfo } from "@redux/globalState";
import React from "react";
import { useSelector } from "react-redux";
import ViewTicketInfoCore from "./ViewTicketInfoCore";

type Props = {};

export default function PersonalHistoryPopup({}: Props) {
  const historyPersonalData = useSelector(
    (state) => state.globalState.historyPersonalData
  );
  const isOpenPersonalHistoryTicketInfo = useSelector(
    (state) => state.globalState.isOpenPersonalHistoryTicketInfo
  );
  return (
    <ViewTicketInfoCore
      data={historyPersonalData}
      setOpen={setOpenHistoryPersonalTicketInfo}
      visibleState={isOpenPersonalHistoryTicketInfo}
    />
  );
}
