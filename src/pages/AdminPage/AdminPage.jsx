import React from "react";

import styles from "./AdminPage.module.css";
import clsx from "clsx";

export default function AdminPage() {
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
      AdminPage
    </div>
  );
}
