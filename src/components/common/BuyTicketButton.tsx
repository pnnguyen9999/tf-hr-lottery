import { useSelector } from "react-redux";
import { HeroButton } from "./HeroButton";
import { Modal, Space, Input } from "antd";
import { useEffect, useState } from "react";
import { ApproveButton } from "./ApproveButton";
/**
 * This is also include modal buy ticket
 */
export function BuyTicketButton() {
  const web3data = useSelector((state) => state.web3.utilsWallet) as any;
  const hegemBalance = useSelector((state) => state.web3.balance);
  const allowance = useSelector((state) => state.web3.allowance);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [ticketAmount, setTicketAmount] = useState<number>(0);
  const [lotteryNumberArray, setLotteryNumberArray] = useState<any>();

  const ModalHeader = () => {
    return <div className="cl-br fnt-s3 fnt-b">Buy Tickets</div>;
  };

  const BuyInstantly = () => {
    const buyInstaly = async () => {
      await web3data.buyTicket(
        {
          ticketNumbers: lotteryNumberArray.map(
            (number: any) => 10000 + number
          ),
        },
        async (data: any) => {
          if (data.status === "EXECUTE_BUY_TICKET_SUCCESS") {
            console.log("execute success");
          } else if (data.status === "EXECUTE_BUY_TICKET_FAIL") {
            console.log("execute fail");
          }
        }
      );
    };
    return <HeroButton text="Buy Instantly" action={() => buyInstaly()} />;
  };

  useEffect(() => {
    if (ticketAmount > 0) {
      setLotteryNumberArray([]);
      for (let i = 0; i < ticketAmount; i++) {
        setLotteryNumberArray((prev: any) =>
          prev == undefined
            ? []
            : [...prev, Math.floor(1000 + Math.random() * 9000)]
        );
      }
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
        centered
        footer={false}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <div className="d-flex flex-column justify-content-center">
          <Space size={10} direction="vertical" className="w-100">
            <div className="cl-br fnt-b fnt-s2">Buy</div>
            <Input
              placeholder="Enter number of ticket(s)"
              type="number"
              onChange={(e) => setTicketAmount(parseInt(e.target.value))}
            />
            <div className="w-100 d-flex align-items-center justify-content-end">
              <div className="cl-br fnt-s1 fnt-b">HEGEM</div>
              <div className="cl-br fnt-s1">
                &nbsp;balance:&nbsp;{hegemBalance}
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
              {allowance !== "0" ? <BuyInstantly /> : <ApproveButton />}
            </div>
            <div>
              {lotteryNumberArray?.map((obj: any, index: number) => (
                <div>{obj}</div>
              ))}
            </div>
            <div className="w-100 d-flex justify-content-center">
              <u className="fnt-b cl-br fnt-s1 cursor-pointer">
                View/Edit Ticket Number
              </u>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
}
