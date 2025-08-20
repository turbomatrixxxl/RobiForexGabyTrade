import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { useMediaQuery } from "react-responsive";

// import { useAuth } from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";
// import { logOut } from "../../redux/auth/operationsAuth";
// import { reset } from "../../redux/auth/authSlice";

import clsx from "clsx";

import Button from "../commonComponents/Button";
import Modal from "../commonComponents/Modal/Modal";

// import logoSmall from "../../images/cactus.png";
// import logoBig from "../../images/cactus@2x.png";

import roby from "../../images/Roby.jpg";

import LogoSection from "../LogoSection/LogoSection";

import BotsStatus from "../BotsStatus/BotsStatus";

import getCurrentDateTime from "../../utils/getCurrentDateTime";

import { balance } from "../Chart/Chart";

import styles from "./Sidebar.module.css";

export default function Sidebar({ sideBarRef, theme }) {
  const [isLogoutModalVisible, toggleIsLogoutModalVisible] = useToggle(false);
  const modalRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const botSelected = JSON.parse(localStorage.getItem("cBotSelected")) || null;
  const [botStarted, setBotStarted] = useState(
    botSelected ? botSelected.message : false
  );

  const robots = JSON.parse(localStorage.getItem("cBots")) || [];

  const handleLogout = () => {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("isLoggedin");
  };

  useEffect(() => {
    if (isLogoutModalVisible) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") toggleIsLogoutModalVisible();
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.classList.remove(styles.noScroll);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isLogoutModalVisible, toggleIsLogoutModalVisible]);

  const closeOnClickOutside = (event) => {
    // console.log("close");

    if (event.target !== event.currentTarget) {
      toggleIsLogoutModalVisible();
    }
  };

  function handleStartBot() {
    // Toggle local state
    const newBotStarted = {
      ...botSelected,
      message: !botStarted,
      time: getCurrentDateTime(),
    };
    setBotStarted(!botStarted);

    // Oprim orice alt bot pornit
    const updatedRobots = robots.map((bot) => {
      if (bot.id === newBotStarted.id) {
        return newBotStarted; // actualizăm botul selectat
      }
      return { ...bot, message: false }; // oprim restul
    });

    // Salvăm în localStorage
    localStorage.setItem("cBotSelected", JSON.stringify(newBotStarted));
    localStorage.setItem("cBots", JSON.stringify(updatedRobots));
  }

  return (
    <aside
      ref={sideBarRef}
      className={clsx(
        styles.cont,
        theme === "dark"
          ? styles.asideDark
          : theme === "violet"
          ? styles.asideViolet
          : styles.asideLight
      )}>
      {isLogoutModalVisible && (
        <div className={styles.modalOverlay}>
          <div
            ref={modalRef}
            className={clsx(
              styles.modalContent,
              theme === "violet" && styles.violet,
              theme === "dark" && styles.dark
            )}
            onClick={closeOnClickOutside}>
            <Modal
              variant={theme}
              closeButton={clsx(
                styles.closeButton,
                theme !== "light" && styles.closeButtonDark
              )}
              handleModalClose={toggleIsLogoutModalVisible}
              isModalVisible={isLogoutModalVisible}>
              <div
                className={clsx(
                  styles.modalLogoutActionCenter,
                  theme === "violet" && styles.violet,
                  theme === "dark" && styles.dark
                )}>
                <img className={styles.logo} src={roby} alt="roby logo" />
                <p
                  className={clsx(
                    styles.question,
                    theme === "dark" ? styles.questionDark : styles.question
                  )}>
                  Are you sure you want to log out?
                </p>
                <div className={styles.modalButtonsContainer}>
                  <Button
                    handleClick={() => {
                      toggleIsLogoutModalVisible();
                      handleLogout();
                      navigate("/home");
                    }}
                    type="button"
                    variant="auth">
                    Logout
                  </Button>
                  <Button
                    variant="auth"
                    handleClick={toggleIsLogoutModalVisible}
                    type="button">
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
      <div className={styles.projectsCont}>
        <LogoSection menuType={"Menu"} theme={theme} />
        <nav className={styles.projectsNav}>
          <ul className={styles.sideLinks}>
            <li>
              <NavLink
                to="/home/robots"
                className={({ isActive }) =>
                  clsx(
                    styles.menuBtn,
                    theme === "light" && styles.lightMenuBtn,
                    isActive &&
                      (theme === "light"
                        ? styles.lightActiveMenuBtn
                        : styles.activeBtn)
                  )
                }>
                Robots
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/positions"
                className={({ isActive }) =>
                  clsx(
                    styles.menuBtn,
                    theme === "light" && styles.lightMenuBtn,
                    (isActive || location.pathname === "/home") &&
                      (theme === "light"
                        ? styles.lightActiveMenuBtn
                        : styles.activeBtn)
                  )
                }>
                Positions
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/home/order"
                className={({ isActive }) =>
                  clsx(
                    styles.menuBtn,
                    theme === "light" && styles.lightMenuBtn,
                    isActive &&
                      (theme === "light"
                        ? styles.lightActiveMenuBtn
                        : styles.activeBtn)
                  )
                }>
                Order
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/history"
                className={({ isActive }) =>
                  clsx(
                    styles.menuBtn,
                    theme === "light" && styles.lightMenuBtn,
                    isActive &&
                      (theme === "light"
                        ? styles.lightActiveMenuBtn
                        : styles.activeBtn)
                  )
                }>
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/log"
                className={({ isActive }) =>
                  clsx(
                    styles.menuBtn,
                    theme === "light" && styles.lightMenuBtn,
                    isActive &&
                      (theme === "light"
                        ? styles.lightActiveMenuBtn
                        : styles.activeBtn)
                  )
                }>
                Log
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/balance"
                className={({ isActive }) =>
                  clsx(
                    styles.menuBtn,
                    theme === "light" && styles.lightMenuBtn,
                    isActive &&
                      (theme === "light"
                        ? styles.lightActiveMenuBtn
                        : styles.activeBtn)
                  )
                }>
                Balance
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.info}>
          <BotsStatus
            theme={theme}
            symbol={botSelected?.instrument}
            live={botSelected?.live}
            name={botSelected?.cBotName}
            started={botSelected?.message}
            handleClick={handleStartBot}
          />
          <p
            className={clsx(
              styles.balance,
              theme === "violet" && styles.violetNoSelected
            )}>
            Account balance {balance} $
          </p>
        </div>
        <NavLink
          style={{ marginTop: "auto", fontSize: "12px" }}
          to="/home/admin"
          className={({ isActive }) =>
            clsx(
              styles.menuBtn,
              theme === "light" && styles.lightMenuBtn,
              isActive &&
                (theme === "light"
                  ? styles.lightActiveMenuBtn
                  : styles.activeBtn)
            )
          }>
          Admin
        </NavLink>
      </div>
      <button
        onClick={toggleIsLogoutModalVisible}
        className={styles.logoutButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none">
          <path
            d="M11.8667 10.0798C12.28 5.27982 14.7467 3.31982 20.1467 3.31982H20.32C26.28 3.31982 28.6667 5.70649 28.6667 11.6665V20.3598C28.6667 26.3198 26.28 28.7065 20.32 28.7065H20.1467C14.7867 28.7065 12.32 26.7732 11.88 22.0532"
            stroke={
              theme === "violet"
                ? "white"
                : theme === "dark"
                ? "#bedbb0"
                : "#2e1746"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.6665 16H19.8398"
            stroke={
              theme === "violet"
                ? "white"
                : theme === "dark"
                ? "#bedbb0"
                : "#2e1746"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8667 11.5332L21.3334 15.9999L16.8667 20.4665"
            stroke={
              theme === "violet"
                ? "white"
                : theme === "dark"
                ? "#bedbb0"
                : "#2e1746"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={clsx(
            styles.logoutButtonSpan,
            theme === "light"
              ? styles.logoutButtonSpanLight
              : styles.logoutButtonSpan
          )}>
          Log out
        </span>
      </button>
    </aside>
  );
}
