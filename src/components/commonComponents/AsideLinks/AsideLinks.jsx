import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./AsideLinks.module.css";

export default function AsideLinks({ name, to, theme }) {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          styles.nav,
          isActive
            ? theme === "light"
              ? styles.activeLinkLight
              : theme === "dark"
              ? styles.activeLinkDark
              : styles.activeLinkViolet
            : styles.link // Apply activeLink style if the link is active
        )
      }
      to={to}>
      {name}
    </NavLink>
  );
}

AsideLinks.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["light", "dark", "violet"]), // Theme options
};
