"use client";

import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import "animate.css";

// import "chart.js/auto";

import clsx from "clsx";

import styles from "./Chart.module.css";

export const balance = 1000.12;

export default function Chart() {
  const theme = localStorage.getItem("theme") || "dark";

  const profit = 54.0;
  const proc = 5.42;
  const equity = 1030.18;
  const free = 900.5;

  //  data
  const data = [
    profit > 0 && {
      name: "Day Profit",
      value: profit,
      backgroundColor: "#37e673",
      borderWidth: 0,
      hoverOffset: 5,
    },
    equity > 0 && {
      name: "Equity",
      value: equity,
      backgroundColor: "#ea3c53",
      borderWidth: 0,
      hoverOffset: 5,
    },
    free > 0 && {
      name: "Free",
      value: free,
      backgroundColor: "#7000ff",
      borderWidth: 0,
      hoverOffset: 5,
    },
    {
      name: "There are no transactions for this period !",
      value: 0.0000000001,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderWidth: 0,
      hoverOffset: 5,
    },
  ];

  const sortedData = data.sort((a, b) => {
    let ap = Number(a.value);
    // console.log(ap);

    let bp = Number(b.value);
    // console.log(b);

    return ap - bp;
  });

  //   console.log(sortedData);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      //   console.log(payload[0].payload.fill);

      return (
        <div
          className={clsx(
            styles.tooltipContainer,
            theme === "violet" && styles.violet
          )}>
          <p className={styles.tooltipNameContainer}>{`${payload[0].name}`}</p>
          <div className={styles.tooltipSumContainer}>
            <div
              style={{
                background: `${payload[0].payload.fill}`,
                borderRadius: "2.5px",
              }}></div>
            <span>{Number(payload[0].value).toFixed(2)} $</span>
          </div>
        </div>
      );
    }

    return null;
  };

  const textAnimationClasses =
    "animate__animated  animate__zoomIn animate__slow";

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart fill="rgba(255, 255, 255, 0.6)">
          <Tooltip cursor={{ cursor: "pointer" }} content={CustomTooltip} />
          <Pie
            startOffset={0}
            className={styles.chart}
            data={sortedData}
            dataKey="value"
            outerRadius={135}
            innerRadius={95}
            // paddingAngle={5}
            fill="rgba(255, 255, 255, 0.6)">
            {data.map((entry, index) => {
              //   console.log(entry.backgroundColor);
              // console.log(entry.name);

              return <Cell key={index} fill={entry.backgroundColor} />;
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className={clsx(styles.chartCont, textAnimationClasses)}>
        <p
          className={clsx(
            styles.chartBalance,
            theme === "light" && styles.light,
            theme === "violet" && styles.violet
          )}>
          <span>Balance</span>
          {balance ? Number(balance).toFixed(2) : Number(0).toFixed(2)}
          <span>₴</span>
        </p>
        <p
          className={clsx(
            styles.chartBalance,
            theme === "light" && styles.light,
            theme === "violet" && styles.violet
          )}>
          <span>Day profit</span>
          {balance ? Number(proc).toFixed(2) : Number(0).toFixed(2)}
          <span>%</span>
        </p>
      </div>
    </div>
  );
}
