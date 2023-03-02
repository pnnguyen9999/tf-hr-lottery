import React from "react";
import { Pie } from "@ant-design/plots";

export default function HegemPie({}) {
  const data = [
    {
      type: "Matches First 4",
      value: 66.67,
    },
    {
      type: "Matches First 3",
      value: 20.83,
    },
    {
      type: "Matches First 2",
      value: 8.33,
    },
    {
      type: "Matches First 1",
      value: 4.17,
    },
  ];
  const config = {
    appendPadding: 25,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    legend: false,
    tooltip: false,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    color: ["#8067DC", "#C766DC", "#FBAF1C", "#66B7DC"],
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div>
      <Pie {...config} />
    </div>
  );
}
