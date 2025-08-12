import React from "react";

import clsx from "clsx";

import Grafic from "../../components/commonComponents/Grafic";

import styles from "./HistoryPage.module.css";

export default function HistoryPage() {
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
      <Grafic />
    </div>
  );
}
