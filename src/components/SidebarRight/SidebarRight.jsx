import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import LogoSection from "../LogoSection/LogoSection";

import styles from "./SidebarRight.module.css";
import ParametersForm from "../ParametersForm/ParametersForm";

// const breakpoints = {
//   mobile: "(max-width: 767px)",
//   tablet: "(min-width:768px)",
// };

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
      </div>
    </aside>
  );
}

SidebarRight.propTypes = {
  sideBarRightRef: PropTypes.object,
  theme: PropTypes.string,
  params: PropTypes.object,
};
