import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

import clsx from "clsx";

import LogoSection from "../LogoSection/LogoSection";
import ParametersForm from "../ParametersForm/ParametersForm";

import styles from "./SidebarRight.module.css";

export default function SidebarRight({ sideBarRightRef, theme, params }) {
  return (
    <aside
      ref={sideBarRightRef}
      className={clsx(
        styles.cont,
        theme === "dark"
          ? styles.asideDark
          : theme === "violet"
          ? styles.asideViolet
          : styles.asideLight
      )}>
      <div className={styles.paramsCont}>
        <LogoSection menuType={"Settings"} theme={theme} />
        <ParametersForm params={params} theme={theme} />
        <div className={styles.chatCont}>
          <h2 className={styles.parametersTitle}>Chat</h2>
          <NavLink to="/home/chat" className={styles.chatFab}>
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path
                fill="#151b22"
                d="M12 2C6.48 2 2 5.58 2 10c0 1.78.73 3.43 1.98 4.82L2 22l6.63-2.54C9.76 19.82 10.87 20 12 20c5.52 0 10-3.58 10-8s-4.48-8-10-8z"></path>
            </svg>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

SidebarRight.propTypes = {
  sideBarRightRef: PropTypes.object,
  theme: PropTypes.string,
  params: PropTypes.object,
};
