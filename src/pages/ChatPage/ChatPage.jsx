import React from "react";
import { Outlet } from "react-router-dom";

import clsx from "clsx";

import ChatsAside from "../../components/ChatsAside/ChatsAside";
import ChatHeader from "../../components/ChatHeader";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const theme = localStorage.getItem("theme") || "dark";

  return (
    <div
      className={clsx(
        styles.cont,
        theme === "light"
          ? styles.lightCont
          : theme === "violet"
          ? styles.violetCont
          : styles.darkCont
      )}>
      <ChatsAside />
      <div className={clsx(styles.content)}>
        <ChatHeader />
        <section className={styles.main}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
