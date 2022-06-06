import React from "react";
import { Pie } from "@ant-design/plots";

export default function Charts({}) {
  const data = [
    {
      type: "type 1",
      value: 27,
    },
    {
      type: "type 2",
      value: 25,
    },
    {
      type: "type 3",
      value: 18,
    },
    {
      type: "type 4",
      value: 15,
    },
    {
      type: "type 5",
      value: 10,
    },
    {
      type: "type 6",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    legend: false,
    tooltip: false,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
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
