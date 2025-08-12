import React from "react";

import clsx from "clsx";

import styles from "./RobotsPage.module.css";

export default function RobotsPage() {
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
      RobotsPage
    </div>
  );
}
