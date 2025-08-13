import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Grafic from "../../components/commonComponents/Grafic";
import styles from "./HistoryPage.module.css";

const historyData = [
  {
    symbol: "XAUUSD",
    direction: "Buy",
    time: "2025-07-11 06:59",
    entryPrice: 3332.89,
    closePrice: 3332.74,
    quantity: 0.03,
    net: -0.63,
    balance: 241.53,
    profit: 38.04,
  },
  {
    symbol: "BTCUSD",
    direction: "Sell",
    time: "2025-07-13 16:13",
    entryPrice: 65350,
    closePrice: 65210,
    quantity: 0.012,
    net: 1.2,
    balance: 251.0,
    profit: 5.12,
  },
  {
    symbol: "EURUSD",
    direction: "Buy",
    time: "2023-11-20 10:22",
    entryPrice: 1.12,
    closePrice: 1.123,
    quantity: 0.25,
    net: 7.2,
    balance: 258.2,
    profit: 10.07,
  },
  {
    symbol: "US30",
    direction: "Sell",
    time: "2024-08-20 10:25",
    entryPrice: 1.15,
    closePrice: 1.123,
    quantity: 0.25,
    net: 7.2,
    balance: 258.2,
    profit: 10.07,
  },
];

export default function HistoryPage() {
  const theme = localStorage.getItem("theme") || "dark";

  const [filterSymbol, setFilterSymbol] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(0);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const uniqueSymbols = [...new Set(historyData.map((x) => x.symbol))];
  const uniqueYears = [...new Set(historyData.map((x) => x.time.slice(0, 4)))];

  useEffect(() => {
    const filterHistory = () => {
      const arr = historyData.filter((x) => {
        if (filterSymbol && x.symbol !== filterSymbol) return false;
        if (filterYear && !x.time.startsWith(filterYear)) return false;
        if (filterMonth && x.time.slice(5, 7) !== filterMonth) return false;
        if (filterDate && !x.time.startsWith(filterDate)) return false;
        return true;
      });
      setFilteredData(arr);
      setTotal(arr.reduce((sum, x) => sum + (x.profit || 0), 0));
    };
    filterHistory();
  }, [filterYear, filterMonth, filterSymbol, filterDate]);

  const resetFilters = () => {
    setFilterSymbol("");
    setFilterMonth("");
    setFilterYear("");
    setFilterDate("");
  };

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
      <div className={styles.tableZone}>
        <div className={styles.historyFilters}>
          <select
            value={filterSymbol}
            onChange={(e) => setFilterSymbol(e.target.value)}
            className={clsx(
              styles.paramSelect,
              theme === "violet" && styles.thViolet
            )}>
            <option value="">All symbols</option>
            {uniqueSymbols.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className={clsx(
              styles.paramSelect,
              theme === "violet" && styles.thViolet
            )}>
            <option value="">All months</option>
            {Array.from({ length: 12 }, (_, i) =>
              i > 0 ? (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {months[i]}
                </option>
              ) : null
            )}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className={clsx(
              styles.paramSelect,
              theme === "violet" && styles.thViolet
            )}>
            <option value="">All years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <div className={styles.dateWrapper}>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className={clsx(
                styles.paramInput,
                theme === "violet" && styles.thViolet
              )}
            />
            <span
              className={clsx(
                styles.dateFormat,
                theme === "violet" && styles.thViolet
              )}>
              dd--mm--yyyy
            </span>
          </div>

          <button
            onClick={resetFilters}
            className={clsx(
              styles.resetButton,
              theme === "violet" && styles.thViolet
            )}>
            Reset
          </button>
        </div>

        <table className={styles.historyTable}>
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
                Direction
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Close time
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Entry price
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Close price
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
                Net $
              </th>
              <th
                className={clsx(
                  styles.tableHeaderCell,
                  theme === "violet" && styles.thViolet
                )}>
                Balance $
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((x, i) => (
                <tr key={i}>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.symbol}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.direction}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}
                    dangerouslySetInnerHTML={{
                      __html: x.time.replace(" ", "<br/>"),
                    }}
                  />
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.entryPrice}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.closePrice}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.quantity}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.net}
                  </td>
                  <td
                    className={clsx(
                      theme === "violet" && styles.thViolet,
                      styles.tableDataCell
                    )}>
                    {x.balance}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className={clsx(
                    theme === "violet" && styles.thViolet,
                    styles.emptyMsg
                  )}>
                  No transaction found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {filteredData.length > 0 && (
          <div className={styles.historyTotal}>
            Profit: $ {total.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}
