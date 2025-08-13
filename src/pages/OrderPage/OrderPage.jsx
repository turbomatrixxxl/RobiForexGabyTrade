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
      <div className={styles.tableZone} id="ordersSection">
        <table className={styles.ordersTable}>
          <thead className={styles.ordersTableHeadCell}>
            <tr className={styles.ordersTableHeadRow}>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Direction
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Type
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Time
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Symbol
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Quantity
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Price
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                Distance
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                TP
              </th>
              <th
                className={clsx(
                  styles.ordersTableHeadCell,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                SL
              </th>
            </tr>
          </thead>
          <tbody className={styles.ordersTableBodyCell}>
            <tr className={styles.ordersTableBodyRow}>
              <td
                colSpan="9"
                className={clsx(
                  styles.ordersTableBodyCell,
                  styles.emptyMessage,
                  theme === "violet" && styles.emptyMessageViolet
                )}>
                No pending orders
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
