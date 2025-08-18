import React from "react";
import PropTypes from "prop-types";

import roby from "../../../images/Roby.jpg";

import clsx from "clsx";

import styles from "./RobotCard.module.css";

export default function RobotCard({
  theme,
  handleClick,
  name,
  position,
  isSelected,
  user,
}) {
  return (
    <div className={styles.cont}>
      <div className={clsx(styles.name, theme === "violet" && styles.violetTh)}>
        {name}
      </div>
      <div
        className={clsx(
          styles.usersCardRobot,
          theme === "violet" && styles.violetTh
        )}>
        {user ? user.username : "tradegaby19"}
      </div>
      <div className={styles.robotAvatar}>
        <img
          className={styles.img}
          src={user ? user.avatarBase64 : roby}
          alt="cBot Avatar"
        />
      </div>
      <div
        className={clsx(
          styles.robotStatus,
          theme === "violet" && styles.violetTh
        )}>
        <span>☁️</span>
        <span className={styles.position}>{position}</span>
      </div>
      <button
        className={clsx(
          styles.selectBot,
          theme === "violet" && styles.violetThBtn,
          isSelected && styles.selectBotActive
        )}
        onClick={handleClick}>
        {isSelected ? `${name} selected` : `Choose ${name}`}
      </button>
    </div>
  );
}

RobotCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.number,
  isSelected: PropTypes.bool,
  theme: PropTypes.string,
};
