import React from "react";

import clsx from "clsx";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
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
      ChatPage
    </div>
  );
}
