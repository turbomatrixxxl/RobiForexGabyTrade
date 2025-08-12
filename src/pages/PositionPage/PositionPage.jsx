import React from "react";
// import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

import Grafic from "../../components/commonComponents/Grafic";

import styles from "./PositionPage.module.css";

export default function PositionPage() {
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
      <div className={styles.tableArea} id="positionsSection">
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Symbol
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Quantity
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Direction
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Entry Price
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                TP
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                SL
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Created
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Net $
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="8"
                className={clsx(
                  theme === "violet" && styles.thViolet,
                  styles.emptyMsg
                )}>
                No open positions
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
