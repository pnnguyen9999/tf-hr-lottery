import { useDispatch, useSelector } from "react-redux";
import { HeroButton } from "./HeroButton";
import { Modal, Space, Input } from "antd";
import { useEffect, useState } from "react";
import { ApproveButton } from "./ApproveButton";
import _ from "lodash";
import OtpInput from "react-otp-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  setlatestLotteryData,
  setlatestPersonalData,
  setLoadinglatestLotteryData,
  setOpenPopupStatus,
} from "@redux/globalState";
import useFetchContractInfo from "src/lib/hooks/useFetchContractInfo";
import useFetchPersonalInfo from "src/lib/hooks/useFetchPersonalInfo";
/**
 * This is also include modal buy ticket
 */
export function BuyTicketButton() {
  const dispatch = useDispatch();
  const web3data = useSelector((state) => state.web3.utilsWallet) as any;
  const hegemBalance = useSelector((state) => state.web3.balance);
  const allowance = useSelector((state) => state.web3.allowance);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [ticketAmount, setTicketAmount] = useState<number>(0);
  const [lotteryNumberArray, setLotteryNumberArray] = useState<any>();
  const [switchPopupContent, setPopupContent] = useState<number>(1);
  const latestLotteryId = useSelector(
    (state) => state.globalState.latestLotteryId
  );
  const address = useSelector((state) => state.web3.address);
  const ModalHeader = () => {
    return switchPopupContent === 1 ? (
      <div className="cl-br-drk fnt-s3 fnt-b">Buy Tickets</div>
    ) : (
      <div className="cl-br-drk d-flex align-items-center">
        <ArrowLeftOutlined
          className="cursor-pointer fnt-s3"
          onClick={() => setPopupContent(1)}
        />
        <div className="fnt-s3 fnt-b mt-2 ml-1">Edit Ticket Number</div>
      </div>
    );
  };

  const BuyInstantly = ({ text }: { text: string }) => {
    const buyInstantly = async () => {
      await web3data.buyTicket(
        {
          ticketNumbers: lotteryNumberArray.map(
            (number: any) =>
              10000 + parseInt(_.reverse(number.toString().split("")).join(""))
          ),
        },
        async (data: any) => {
          if (data.status === "EXECUTE_BUY_TICKET_SUCCESS") {
            setOpenModal(false);
            if (latestLotteryId) {
              console.log(latestLotteryId);
              dispatch(setLoadinglatestLotteryData(true));
              const data = await useFetchContractInfo(latestLotteryId);
              dispatch(setLoadinglatestLotteryData(false));
              dispatch(setlatestLotteryData(data));
            }
            if (address && latestLotteryId) {
              const data = await useFetchPersonalInfo(latestLotteryId, address);
              dispatch(setlatestPersonalData(data));
            }
            dispatch(
              setOpenPopupStatus({
                isOpen: true,
                type: "success",
                message: "Buy Ticket Successfully !",
              })
            );
          } else if (data.status === "EXECUTE_BUY_TICKET_FAIL") {
            setOpenModal(false);
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
    };
    return <HeroButton text={text} action={() => buyInstantly()} />;
  };

  const randomizeTicketNumbers = () => {
    setLotteryNumberArray([]);
    for (let i = 0; i < ticketAmount; i++) {
      setLotteryNumberArray((prev: any) =>
        prev == undefined
          ? []
          : [...prev, Math.floor(1000 + Math.random() * 9000)]
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

  return (
    <>
      <HeroButton text="Buy Ticket" action={() => setOpenModal(true)} />
      <Modal
        title={<ModalHeader />}
        style={{ top: 20 }}
        visible={isOpenModal}
        // centered
        footer={false}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <div className="d-flex flex-column justify-content-center">
          {switchPopupContent === 1 ? (
            <Space size={10} direction="vertical" className="w-100">
              <div className="cl-br-drk fnt-b fnt-s2">Buy</div>
              <Input
                placeholder="Enter number of ticket(s)"
                type="number"
                value={ticketAmount}
                onChange={(e) => setTicketAmount(parseInt(e.target.value))}
              />
              <div className="w-100 d-flex align-items-center justify-content-end">
                <div className="cl-br-drk fnt-s1 fnt-b">HEGEM</div>
                <div className="cl-br-drk fnt-s1">
                  &nbsp;balance:&nbsp;{hegemBalance}
                </div>
              </div>
              <div className="w-100 d-flex justify-content-center">
                {allowance !== "0" ? (
                  <BuyInstantly text="Buy Instantly" />
                ) : (
                  <ApproveButton />
                )}
              </div>

              <div className="w-100 d-flex justify-content-center">
                <u
                  className="fnt-b cl-br-drk fnt-s1 cursor-pointer"
                  onClick={() => setPopupContent(2)}
                >
                  View/Edit Ticket Number -&gt;
                </u>
              </div>
              <div className="fnt-s1 cl-br-drk text-center">
                Buy Instantly chooses random numbers, with no duplicates among
                your tickets.
              </div>
            </Space>
          ) : (
            <div className="d-flex flex-column justify-content-center">
              <Space size={10} direction="vertical">
                <div className="fnt-s1 cl-br-drk text-center">
                  Numbers are randomized with no duplicates among your tickets.
                  Tap a number to edit it. Available digits 0-9
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
                      <div className="cl-br-drk fnt-s1">
                        Ticket #{index + 1}
                      </div>
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
                  <BuyInstantly text="Buy Instantly" />
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
