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
