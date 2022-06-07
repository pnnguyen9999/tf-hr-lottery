import { setOpenPersonalTicketInfo } from "@redux/globalState";
import React from "react";
import { useSelector } from "react-redux";
import ViewTicketInfoCore from "./ViewTicketInfoCore";

type Props = {};

export default function PersonalLatestPopup({}: Props) {
  const latestPersonalData = useSelector(
    (state) => state.globalState.latestPersonalData
  );
  const isOpenPersonalTicketInfo = useSelector(
    (state) => state.globalState.isOpenPersonalTicketInfo
  );
  return (
    <ViewTicketInfoCore
      data={latestPersonalData}
      setOpen={setOpenPersonalTicketInfo}
      visibleState={isOpenPersonalTicketInfo}
    />
  );
}
