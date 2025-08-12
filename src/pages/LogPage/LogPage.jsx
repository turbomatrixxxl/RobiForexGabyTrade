import React from "react";

import clsx from "clsx";

import styles from "./LogPage.module.css";

export default function LogPage() {
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
      LogPage
    </div>
  );
}
