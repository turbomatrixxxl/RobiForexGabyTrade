import React from "react";

import clsx from "clsx";

import Grafic from "../../components/commonComponents/Grafic";

import styles from "./LogPage.module.css";

export default function LogPage() {
  const theme = localStorage.getItem("theme") || "dark";
  const cBots = localStorage.getItem("cBots")
    ? JSON.parse(localStorage.getItem("cBots"))
    : [];
  const cBotSelected = cBots.find((bot) => bot.message === true);

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
      <div
        style={{ marginBottom: "20px" }}
        className={styles.tableArea}
        id="journalSection">
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Logs
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                {cBotSelected ? cBotSelected.cBotName : null}
              </th>
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            <tr colSpan={3} className={styles.tableRow}>
              <td className={clsx(styles.true, styles.emptyMsg)}></td>
            </tr>
          </tbody>

          {!cBotSelected && (
            <tbody className={styles.tableBody}>
              <tr className={styles.tableRow}>
                <td
                  colSpan={3}
                  className={clsx(
                    styles.emptyMsgNoLogs,
                    theme === "violet" && styles.thViolet
                  )}>
                  No C-Bot started
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

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
                Status
              </th>
            </tr>
          </thead>
          {cBots.length > 0 && (
            <tbody className={styles.tableBody}>
              {cBots.map((x, i) => (
                <tr key={`cBot${i}`} className={styles.tableRow}>
                  <td
                    className={clsx(
                      x?.message === true ? styles.true : styles.false,
                      styles.emptyMsg
                    )}>
                    {x?.time}
                  </td>
                  <td
                    className={clsx(
                      x?.message === true ? styles.true : styles.false,
                      styles.emptyMsg,
                      styles.cBotName
                    )}>
                    {x?.cBotName}
                  </td>
                  <td
                    className={clsx(
                      x?.message === true ? styles.true : styles.false,
                      styles.emptyMsg
                    )}>
                    {x?.message === true ? "Trader started" : "Trader stopped"}
                  </td>
                </tr>
              ))}
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
