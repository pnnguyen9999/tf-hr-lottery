import { Space } from "antd";
import React from "react";

type Props = {};
interface StepComponent {
  title: string;
  name: string;
  description: string;
}
const StepComponents: StepComponent[] = [
  {
    title: "STEP 1",
    name: "Buy Ticket",
    description: "Keep natural numbers or set the numbers in the Edit button",
  },
  {
    title: "STEP 2",
    name: "Wait for the Draw",
    description: "There is one draw every day",
  },
  {
    title: "STEP 3",
    name: "Check for the Prizes",
    description: "Once the round’s over, come back to the page and check to see if you’ve won",
  },
];
export default function HowToPlay({}: Props) {
  const StepComponent = ({ title, name, description }: StepComponent) => {
    return (
      <div className="col-md-4">
        <div className="step-panel-cont mb-md-0 mb-4">
          <Space direction="vertical" size={10} className="p-3 w-100">
            <div className="d-flex justify-content-end">
              <div className="fnt-s1 cl-w">{title}</div>
            </div>
            <div className="d-flex justify-content-start">
              <div className="fnt-s1 fnt-b cl-yl">{name}</div>
            </div>
            <div className="fnt-s1 cl-w">{description}</div>
          </Space>
        </div>
      </div>
    );
  };
  return (
    <div className="how-to-play my-5">
      <div className="text-center cl-w fnt-b fnt-s5">HOW TO PLAY</div>
      <div className="fnt-s1 cl-w text-center my-4">
        If the numbers code on your tickets match the winning numbers of our Lottery, you win a portion of the prize
        pool.
      </div>
      <div className="col-12">
        <div className="row">
          {StepComponents.map((step: StepComponent, index: number) => (
            <StepComponent key={index} title={step.title} name={step.name} description={step.description} />
          ))}
        </div>
      </div>
      <div className="col-12 my-5">
        <div className="row">
          <div className="col-md-7">
            <section>
              <div className="cl-yl fnt-s2 fnt-b">Winning Criteria</div>
              <div className="cl-w fnt-s1 fnt-b">The digits on your ticket must match in the correct order to win.</div>
              <div className="cl-w fnt-s1">Here’s an example lottery draw:</div>
              <ul>
                <li>
                  <span className="cl-yl fnt-s1">Ticket A:&nbsp;</span>The first number match, this ticket only wins a
                  “Match first 1” prize and continuously,...
                </li>
                <li>
                  <span className="cl-yl fnt-s1">Ticket B:&nbsp;</span>The first 2 numbers match, this ticket only wins
                  a “Match first 2” prize and continuously,...
                </li>
              </ul>
            </section>
            <section>
              <div className="cl-yl fnt-s2 fnt-b">Prize Funds</div>
              <div className="cl-w fnt-s1 fnt-b">80% of HERA per Pool, 20% of each Pool will be burned + 1000 HERA</div>
              <ul>
                <li>
                  <span className="cl-yl fnt-s1">Specifically:&nbsp;</span>
                  Next period's prize = Number of HERA remaining of previous period's Pool + 80% of next period's Pool +
                  1000 HERA from HERO ARENA
                </li>
                <li>
                  <span className="cl-yl fnt-s1">Example:&nbsp;</span>
                  The first Matches 3 prize (the first 3 digits coincide with the jackpot number) has a total prize
                  value of 1750 HERA, there are 5 people with the first 3 numbers matching the jackpot number
                </li>
              </ul>
              <div className="cl-w fnt-s1 fnt-b">The prize each person gets will be 350 HERA</div>
            </section>
          </div>
          <div className="col-md-5">
            <div className="">
              <img src="/img/example-tickets.png" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
