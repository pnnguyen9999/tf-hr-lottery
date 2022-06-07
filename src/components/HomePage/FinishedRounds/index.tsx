import { Tabs } from "antd";
import React, { ReactElement } from "react";
import AllHistory from "./AllHistory";
import PersonalHistory from "./PersonalHistory";

export default function FinishedRounds(): ReactElement {
  const { TabPane } = Tabs;

  return (
    <div className="finished-rounds my-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center cl-w fnt-b fnt-s5">Finished Rounds</div>
      <Tabs
        defaultActiveKey={"allhistory"}
        onChange={() => {}}
        animated={false}
        tabBarGutter={8}
        className="w-100"
      >
        <TabPane tab="All History" key="allhistory">
          <AllHistory />
        </TabPane>
        <TabPane tab="Your History" key="yourhistory">
          <PersonalHistory />
        </TabPane>
      </Tabs>
    </div>
  );
}
