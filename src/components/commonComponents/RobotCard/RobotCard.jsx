import React from "react";
import PropTypes from "prop-types";

import roby from "../../../images/Roby.jpg";

import styles from "./RobotCard.module.css";
import clsx from "clsx";

export default function RobotCard({ handleClick, name, position, isSelected }) {
  return (
    <div className={styles.cont}>
      <div className={styles.name}>{name}</div>
      <div className={styles.usersCardRobot}>tradegaby19</div>
      <div className={styles.robotAvatar}>
        <img className={styles.img} src={roby} alt="cBot Avatar" />
      </div>
      <div className={styles.robotStatus}>
        <span>☁️</span>
        <span className={styles.position}>{position}</span>
      </div>
      <button
        className={clsx(styles.selectBot, isSelected && styles.selectBotActive)}
        onClick={handleClick}>
        Choose {name}
      </button>
    </div>
  );
}

RobotCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.number,
  isSelected: PropTypes.bool,
};
