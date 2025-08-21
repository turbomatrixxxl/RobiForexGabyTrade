import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { accessChat } from "../../redux/public/chatsSlice"; // Assuming this is your async action

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import roby from "../../images/Roby.jpg";
import gaby from "../../images/teamMembersPhoto/Roby.jpg";

import styles from "./ChatsList.module.css";

export default function ChatsList({ search }) {
  const { chats } = useChats();
  const [reloadMap, setReloadMap] = useState({});
  const dispatch = useDispatch();

  // console.log("chats :", chats);

  const handleImageError = (chatId) => {
    setTimeout(() => {
      setReloadMap((prev) => ({
        ...prev,
        [chatId]: (prev[chatId] || 0) + 1,
      }));
    }, 1000);
  };

  const getLastInboxMessage = (chat) => {
    const inboxMessages = chat?.messages?.filter((msg) => msg?.isInbox);
    if (!inboxMessages?.length) return null;
    return inboxMessages?.reduce((latest, msg) =>
      new Date(msg.sentAt) > new Date(latest.sentAt) ? msg : latest
    );
  };

  const filteredChats = chats?.filter((chat) =>
    chat?.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {filteredChats.map((chat) => (
        <li key={chat.id}>
          <NavLink
            to={`/home/chat/${chat.id}`}
            className={({ isActive }) =>
              clsx(styles.listItem, { [styles.active]: isActive })
            }
            onClick={() => dispatch(accessChat({ chatId: chat.id }))}>
            <div className={styles.imgCont}>
              <img
                key={reloadMap[chat.id] || 0}
                className={styles.userImg}
                src={chat.id === "admin" ? gaby : chat?.user?.avatar ?? roby}
                alt="User img"
                loading="lazy"
                onError={() => handleImageError(chat.id)}
              />
              <div
                className={clsx(
                  styles.isOnline,
                  chat?.user?.isOnline ? styles.online : styles.notOnline
                )}></div>
            </div>
            <div className={styles.infoCont}>
              <p className={styles.name}>{chat?.user?.name}</p>
              <p className={styles.lastMessage}>
                {getLastInboxMessage(chat)?.content || "No messages yet"}
              </p>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
