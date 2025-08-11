// import React, { useEffect, useRef } from "react";
import React from "react";

// import { useMediaQuery } from "react-responsive";

// import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { useMediaQuery } from "react-responsive";

// import { useAuth } from "../../hooks/useAuth";
// import useToggle from "../../hooks/useToggle";
// import { logOut } from "../../redux/auth/operationsAuth";
// import { reset } from "../../redux/auth/authSlice";

import clsx from "clsx";

import LogoSection from "../LogoSection/LogoSection";

import styles from "./SidebarRight.module.css";

// const breakpoints = {
//   mobile: "(max-width: 767px)",
//   tablet: "(min-width:768px)",
// };

export default function SidebarRight({ sideBarRightRef, theme }) {
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
      <div className={styles.projectsCont}>
        <LogoSection menuType={"Settings"} theme={theme} />
      </div>
    </aside>
  );
}
