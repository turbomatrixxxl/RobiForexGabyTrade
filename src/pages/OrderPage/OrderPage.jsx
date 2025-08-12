import React from "react";

import clsx from "clsx";

import Grafic from "../../components/commonComponents/Grafic";

import styles from "./OrderPage.module.css";

export default function OrderPage() {
  const theme = localStorage.getItem("theme") || "dark";

  return (
    <section
      className={clsx(
        styles.cont,
        theme === "light"
          ? styles.lightCont
          : theme === "violet"
          ? styles.violetCont
          : styles.darkCont
      )}>
      <Grafic />
    </section>
  );
}
