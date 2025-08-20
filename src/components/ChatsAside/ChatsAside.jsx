import React, { useState } from "react";

import { useChats } from "../../hooks/useChats";

import ChatsList from "../ChatsList";
import ChatInput from "../commonComponents/ChatInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./ChatsAside.module.css";

export default function ChatsAside() {
  const { activeChats } = useChats();

  const [search, setSearch] = useState("");

  return (
    <aside className={styles.aside}>
      <div className={styles.asideHeader}>
        <p className={styles.asideHeaderTitle}>Active</p>
        <div className={styles.asideHeaderCounter}>{activeChats}</div>
      </div>
      <div className={styles.asideContent}>
        <ChatInput
          className={styles.asideInput}
          paddingLeft={"18px"}
          placeholder={"Search..."}
          value={search}
          handleChange={(e) => setSearch(e.target.value)}>
          <button className={styles.asideInputButton}>
            <FontAwesomeIcon
              className={styles.asideInputSearchIcon}
              icon={faMagnifyingGlass}
            />
          </button>
        </ChatInput>
        <div className={styles.asideChatListCont}>
          <ChatsList search={search} />
        </div>
      </div>
    </aside>
  );
}
