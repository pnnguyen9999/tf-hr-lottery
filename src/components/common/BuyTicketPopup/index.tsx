import { useDispatch, useSelector } from "react-redux";
import { Modal, Space, Input, message } from "antd";
import { useEffect, useState } from "react";
import _ from "lodash";
import OtpInput from "react-otp-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { setOpenLoadingPopup, setOpenPopupBuyTicket, setOpenPopupStatus } from "@redux/globalState";
import { setTriggerLatestDataUseEff } from "@redux/triggerState";
import { HeroButton } from "../HeroButton";
import { ApproveButton } from "../ApproveButton";

export function BuyTicketPopup() {
  const dispatch = useDispatch();
  const web3data = useSelector((state) => state.web3.utilsWallet);
  const HERABalance = useSelector((state) => state.web3.balance);
  const allowanceHera = useSelector((state) => state.web3.allowance);
  const maxAmountCanBuy = useSelector((state) => state.globalState.maxAmountCanBuy);
  const isOpenPopupBuyTicket = useSelector((state) => state.globalState.isOpenPopupBuyTicket);
  const latestLotteryData = useSelector((state) => state.globalState.latestLotteryData);
  const [ticketAmount, setTicketAmount] = useState<number>(1);
  const [lotteryNumberArray, setLotteryNumberArray] = useState<any>();
  const [switchPopupContent, setPopupContent] = useState<number>(1);

  const ModalHeader = () => {
    return switchPopupContent === 1 ? (
      <div className="cl-br-drk fnt-s3 fnt-b">Buy Tickets</div>
    ) : (
      <div className="cl-br-drk d-flex align-items-center">
        <ArrowLeftOutlined className="cursor-pointer fnt-s3" onClick={() => setPopupContent(1)} />
        <div className="fnt-s3 fnt-b mt-2 ml-1">Edit Ticket Number</div>
      </div>
    );
  };

  const checkValidNumberArray = (): boolean[] =>
    lotteryNumberArray.map((number: any) => {
      if (number.toString().split("").length === 4) {
        return true;
      } else {
        return false;
      }
    });

  const BuyInstantly = ({ text }: { text: string }) => {
    const buyInstantly = async () => {
      if (checkValidNumberArray().includes(false)) {
        message.warn("Please fill all ticket number !");
      } else {
        if (!_.isEqual(lotteryNumberArray, [])) {
          await web3data.buyTicket(
            {
              ticketNumbers: lotteryNumberArray.map(
                (number: number | string) =>
                  10000 + parseInt(_.reverse(number.toString().split("")).join(""))
              ),
              // lottery: "hegem",
            },
            async (data: any) => {
              if (data.status === "EXECUTE_BUY_TICKET_SUBMIT") {
                dispatch(setOpenLoadingPopup(true));
              } else if (data.status === "EXECUTE_BUY_TICKET_SUCCESS") {
                dispatch(setOpenLoadingPopup(false));
                dispatch(setOpenPopupBuyTicket(false));
                dispatch(setTriggerLatestDataUseEff());
                dispatch(
                  setOpenPopupStatus({
                    isOpen: true,
                    type: "success",
                    message: "Buy Ticket Successfully !",
                  })
                );
              } else if (data.status === "EXECUTE_BUY_TICKET_FAIL") {
                dispatch(setOpenLoadingPopup(false));
                dispatch(setOpenPopupBuyTicket(false));
                dispatch(
                  setOpenPopupStatus({
                    isOpen: true,
                    type: "fail",
                    message: "Buy Ticket Failed !",
                  })
                );
              }
            }
          );
        } else {
          message.warn("Please enter number of ticket(s)");
        }
      }
    };
    return <HeroButton text={text} action={() => buyInstantly()} />;
  };

  const randomizeTicketNumbers = () => {
    setLotteryNumberArray([]);
    for (let i = 0; i < ticketAmount; i++) {
      setLotteryNumberArray((prev: any) =>
        prev == undefined ? [] : [...prev, Math.floor(1000 + Math.random() * 9000)]
      );
    }
  };
  useEffect(() => {
    if (ticketAmount > 0) {
      randomizeTicketNumbers();
    } else {
      setLotteryNumberArray([]);
    }
  }, [ticketAmount]);

  const inputValidator = (e: string) => {
    const _ticketAmount = parseInt(e);
    if (_ticketAmount <= 0) {
      if (_ticketAmount === 0) {
        message.warn("Ticket amount must be greater than zero");
      }
    } else {
      if (!(_ticketAmount > maxAmountCanBuy)) {
        setTicketAmount(parseInt(e));
      }
    }
  };

  return (
    <>
      <Modal
        title={<ModalHeader />}
        style={{ top: 20 }}
        open={isOpenPopupBuyTicket}
        footer={false}
        onOk={() => dispatch(setOpenPopupBuyTicket(false))}
        onCancel={() => dispatch(setOpenPopupBuyTicket(false))}
      >
        <div className="d-flex flex-column justify-content-center">
          {switchPopupContent === 1 ? (
            <Space size={10} direction="vertical" className="w-100">
              <div className="cl-br-drk fnt-b fnt-s2">Buy</div>
              <Input
                placeholder="Enter number of ticket(s)"
                type="number"
                value={ticketAmount}
                onChange={(e) => inputValidator(e.target.value)}
              />
              {ticketAmount ? (
                <div className="w-100 d-flex align-items-center justify-content-end">
                  {(latestLotteryData?.ticketPrice || 0) * ticketAmount > HERABalance ? (
                    <div className="cl-r fnt-s1 fnt-b">Insufficient HERA balance</div>
                  ) : (
                    <div className="cl-br-drk fnt-s1 fnt-b">
                      ~ {(latestLotteryData?.ticketPrice || 0) * ticketAmount}
                      <span className="fnt-b"></span> HERA
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}

              <div className="w-100 d-flex align-items-center justify-content-end">
                {/* <div className="cl-br-drk fnt-s1 fnt-b">HERA</div> */}
                <div className="cl-br-drk fnt-s1">
                  <span className="fnt-b">HERA</span>&nbsp;balance:&nbsp;{HERABalance}
                </div>
              </div>
              <div className="w-100 d-flex align-items-center justify-content-end">
                <div className="cl-br-drk fnt-s1">
                  You can buy up to
                  <span className="fnt-b"> {maxAmountCanBuy}</span> tickets/transaction
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center">
                {allowanceHera !== "0" ? <BuyInstantly text="Buy Instantly" /> : <ApproveButton />}
              </div>

              <div className="w-100 d-flex justify-content-center">
                <u
                  className="fnt-b cl-br-drk fnt-s1 cursor-pointer"
                  onClick={() => {
                    if (!_.isEqual(lotteryNumberArray, [])) {
                      setPopupContent(2);
                    } else {
                      message.warn("Please enter number of ticket(s)");
                    }
                  }}
                >
                  View/Edit Ticket Number -&gt;
                </u>
              </div>
              <div className="fnt-s1 cl-br-drk text-center">
                Buy Instantly chooses random numbers, with no duplicates among your tickets.
              </div>
            </Space>
          ) : (
            <div className="d-flex flex-column justify-content-center">
              <Space size={10} direction="vertical">
                <div className="fnt-s1 cl-br-drk text-center">
                  Numbers are randomized with no duplicates among your tickets. Tap a number to edit
                  it. Available digits 0-9
                </div>
                <div className="d-flex w-100 justify-content-center">
                  <div
                    className="cl-br-drk d-flex align-items-center cursor-pointer "
                    onClick={() => randomizeTicketNumbers()}
                  >
                    <u className="fnt-s1 fnt-b ml-1">Randomize</u>
                  </div>
                </div>
                {lotteryNumberArray?.map((obj: any, index: number) => (
                  <div
                    className="d-flex justify-content-center animate__animated animate__flipInX"
                    key={index}
                    style={{ animationDelay: `${index / 15}s` }}
                  >
                    <div className="my-1">
                      <div className="cl-br-drk fnt-s1">Ticket #{index + 1}</div>
                      <OtpInput
                        containerStyle=""
                        isInputNum={true}
                        value={obj}
                        numInputs={4}
                        separator={<span className="px-2">-</span>}
                        inputStyle="lottery-edit"
                        onChange={(e: any) => {
                          let cloneLotteryArray = [...lotteryNumberArray];
                          cloneLotteryArray[index] = e;
                          setLotteryNumberArray(cloneLotteryArray);
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="d-flex w-100 justify-content-center">
                  {allowanceHera !== "0" ? (
                    <BuyInstantly text="Buy Instantly" />
                  ) : (
                    <ApproveButton />
                  )}
                </div>
                <div className="d-flex w-100 justify-content-center">
                  <div
                    className="cl-br-drk d-flex align-items-center cursor-pointer "
                    onClick={() => setPopupContent(1)}
                  >
                    <ArrowLeftOutlined className="fnt-s1" />
                    <u className="fnt-s1 fnt-b ml-1">Go back</u>
                  </div>
                </div>
              </Space>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
