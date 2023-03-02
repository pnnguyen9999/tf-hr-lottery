import { Tabs } from "antd";
import { ReactElement } from "react";
import AllHistory from "./AllHistory";
import TabRoundWinNumber from "./TabRoundWinNumber";
import PersonalHistory from "./PersonalHistory";

const { TabPane } = Tabs;

export default function FinishedRounds(): ReactElement {
  const tabRoundWinNumber = <TabRoundWinNumber />;
  return (
    <div className="finished-rounds my-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center cl-w fnt-b fnt-s5">Finished Rounds</div>
      <Tabs
        defaultActiveKey={"all_history"}
        // onChange={() => {}}
        animated={false}
        tabBarGutter={8}
        className="w-100"
      >
        <TabPane tab="All History" key="all_history">
          <div className="all-history-cont">
            {tabRoundWinNumber}
            <AllHistory />
          </div>
        </TabPane>
        <TabPane tab="Your History" key="your_history">
          <div className="personal-history-cont">
            {tabRoundWinNumber}
            <PersonalHistory />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
