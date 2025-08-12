import React from "react";
// import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

// import NewBoardForm from "../../components/modal/NewBoard";

import styles from "./PositionPage.module.css";

export default function PositionPage() {
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
      PositionPage
    </div>
  );
}
