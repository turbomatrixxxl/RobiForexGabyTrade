import React from "react";

import clsx from "clsx";

import Grafic from "../../components/commonComponents/Grafic";

import styles from "./LogPage.module.css";

export default function LogPage() {
  const theme = localStorage.getItem("theme") || "dark";
  const cBots = localStorage.getItem("cBots")
    ? JSON.parse(localStorage.getItem("cBots"))
    : [];

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
      <div className={styles.tableArea} id="journalSection">
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Time
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                C-Bot
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Message
              </th>
            </tr>
          </thead>
          {cBots.length > 0 && (
            <tbody className={styles.tableBody}>
              {cBots.map((x, i) => (
                <tr key={`cBot${i}`} className={styles.tableRow}>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.emptyMsg
                    )}>
                    {x?.time}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.emptyMsg,
                      styles.cBotName
                    )}>
                    {x?.cBotName}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.emptyMsg
                    )}>
                    {x.message === true ? "Trader started" : "Trader stopped"}
                  </td>
                </tr>
              ))}
              {/* <tr className={styles.tableRow}>
                <td
                  className={clsx(
                    theme === "violet" && styles.thViolet,
                    styles.emptyMsg
                  )}>
                  27/07/2025 19:30
                </td>
                <td
                  className={clsx(
                    theme === "violet" && styles.thViolet,
                    styles.emptyMsg,
                    styles.cBotName
                  )}>
                  1
                </td>
                <td
                  className={clsx(
                    theme === "violet" && styles.thViolet,
                    styles.emptyMsg
                  )}>
                  Trader started
                </td>
              </tr> */}
            </tbody>
          )}
          {cBots.length === 0 && (
            <tbody className={styles.tableBody}>
              <tr className={styles.tableRow}>
                <td
                  colSpan={3}
                  className={clsx(
                    styles.emptyMsgNoLogs,
                    theme === "violet" && styles.thViolet
                  )}>
                  No logs available
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
