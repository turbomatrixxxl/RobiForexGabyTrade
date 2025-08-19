import React from "react";

import clsx from "clsx";

import Chart from "../../components/Chart/Chart";

import leftImage from "../../images/login-background-left-side.png";
import rightImage from "../../images/login-background-right-side.png";

import styles from "./BalancePage.module.css";

export default function BalancePage() {
  const theme = localStorage.getItem("theme") || "dark";

  return (
    <div
      className={clsx(
        styles.cont,
        theme === "light"
          ? styles.lightCont
          : theme === "violet"
          ? styles.violetCont
          : styles.darkCont
      )}>
      <div className={styles.imageLeft}>
        <img src={leftImage} alt="Left" />
      </div>
      <div className={styles.imageRight}>
        <img src={rightImage} alt="Right" />
      </div>
      <p className={clsx(styles.p, theme === "violet" && styles.violetP)}>
        Please hover or click the doghnut sections to see the results
      </p>
      <Chart />
    </div>
  );
}
