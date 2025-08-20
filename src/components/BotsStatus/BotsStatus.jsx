import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import BotStatusCard from "../BotStatusCard/BotStatusCard";

import styles from "./BotsStatus.module.css";

export default function BotsStatus({
  theme,
  symbol,
  live,
  handleClick,
  started,
  name,
}) {
  const botSelected = localStorage.getItem("cBotSelected")
    ? localStorage.getItem("cBotSelected")
    : false;

  return botSelected ? (
    <BotStatusCard
      theme={theme}
      symbol={symbol}
      live={live}
      handleClick={handleClick}
      started={started}
      name={name}
    />
  ) : (
    <p
      className={clsx(
        styles.noSelected,
        theme === "light" && styles.lightNoSelected,
        theme === "violet" && styles.violetNoSelected
      )}>
      Please selet a C-bot from Robots section or from settings sidebar to
      engage
    </p>
  );
}

BotsStatus.propTypes = {
  theme: PropTypes.string,
  symbol: PropTypes.string,
  live: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  started: PropTypes.bool,
  handleClick: PropTypes.func,
};
