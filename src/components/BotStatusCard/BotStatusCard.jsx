import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import styles from "./BotStatusCard.module.css";
import LiveSelector from "../commonComponents/Loader/LiveSelector";

export default function BotStatusCard({
  theme,
  symbol,
  live,
  handleClick,
  started,
  name,
}) {
  return (
    <div className={clsx(styles.cont)}>
      <div className={styles.strategyCard}>
        <div
          className={clsx(
            styles.firstLine,
            theme === "violet" && styles.violet
          )}>
          RobiStrategy ForexGaby
        </div>
        <div className={styles.live}>
          <LiveSelector theme={theme} live={live} /> - 2054898 - FP Markets
        </div>
        <div
          className={clsx(
            styles.symbolStrategy,
            theme === "violet" && styles.violet
          )}
          id="symbolStrategy">
          <span>{symbol} - m15 </span>
          <span>{name}</span>
        </div>
      </div>
      <button
        className={clsx(styles.startBtn, started && styles.stop)}
        id="btnBot"
        onClick={handleClick}>
        {started ? "Stop cBot" : "Start cBot"}
      </button>
    </div>
  );
}

BotStatusCard.propTypes = {
  theme: PropTypes.string,
  symbol: PropTypes.string,
  live: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  started: PropTypes.bool,
  name: PropTypes.string,
  handleClick: PropTypes.func,
};
