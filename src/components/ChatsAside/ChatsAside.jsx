import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useChats } from "../../hooks/useChats";
import { accessChat, markChatAsRead } from "../../redux/public/chatsSlice";

import clsx from "clsx";

import ChatsList from "../ChatsList";
import ChatInput from "../commonComponents/ChatInput";

import safeToDate from "../../utils/safeToDate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaEnvelope } from "react-icons/fa";

import roby from "../../images/Roby.jpg";
import gaby from "../../images/teamMembersPhoto/Roby.jpg";

import styles from "./ChatsAside.module.css";

export default function ChatsAside({ isBlocked, theme }) {
  const { chats } = useChats();

  const noReadRef = useRef(null);

  const dispatch = useDispatch();

  const [isNoReadVisible, setIsNoReadVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [reloadMap, setReloadMap] = useState({});

  useEffect(() => {
    function handleClickOutside(event) {
      if (noReadRef.current && !noReadRef.current.contains(event.target)) {
        setIsNoReadVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [noReadRef]);

  const notReadMessagesChats = [...chats]?.filter((chat) => {
    return chat?.messages?.find(
      (msg) => msg.isInbox === true && msg.isRead === false
    );
  });

  // console.log("notReadMessagesChats :", notReadMessagesChats);

  function getLastInboxMessage(chat) {
    const inboxMessages = chat?.messages.filter((m) => m?.isInbox) || {};

    return inboxMessages.reduce((latest, msg) => {
      return new Date(safeToDate(latest?.sentAt)) >
        new Date(safeToDate(msg?.sentAt))
        ? latest
        : msg;
    });
  }

  const handleImageError = (chatId) => {
    setTimeout(() => {
      setReloadMap((prev) => ({
        ...prev,
        [chatId]: (prev[chatId] || 0) + 1,
      }));
    }, 1000);
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.asideContent}>
        {notReadMessagesChats.length > 0 && (
          <div ref={noReadRef} className={styles.newMsgCont}>
            <button
              className={styles.asideNewMesgBtn}
              onClick={() => setIsNoReadVisible(!isNoReadVisible)}>
              New...
              <FaEnvelope className={styles.newMsgSvg} />
            </button>
            {isNoReadVisible && (
              <div className={styles.listCont}>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsNoReadVisible(false)}
                  type="button">
                  X
                </button>
                <ul className={styles.list}>
                  {notReadMessagesChats.map((chat) => {
                    return (
                      <li key={chat?.id}>
                        <NavLink
                          to={`/home/chat/${chat?.id}`}
                          className={clsx(
                            styles.listItem,
                            chat?.user?.isBlocked && styles.isBlocked,
                            chat?.user?.youAreBlocked && styles.youAreBlocked
                          )}
                          onClick={() => {
                            setIsNoReadVisible(false);
                            dispatch(accessChat({ chatId: chat?.id }));
                            dispatch(markChatAsRead({ chatId: chat?.id }));
                          }}>
                          <div className={styles.imgCont}>
                            <img
                              key={reloadMap[chat.id] || 0}
                              className={styles.userImg}
                              src={
                                chat.id === "admin"
                                  ? gaby
                                  : chat?.user?.avatar ?? roby
                              }
                              alt="User img"
                              loading="lazy"
                              onError={() => handleImageError(chat.id)}
                            />
                            <div
                              className={clsx(
                                styles.isOnline,
                                chat?.user?.isOnline
                                  ? styles.online
                                  : styles.notOnline
                              )}></div>
                          </div>
                          <div className={styles.infoCont}>
                            <p className={styles.name}>{chat?.user?.name}</p>
                            <p
                              className={clsx(
                                styles.lastMessage,
                                styles.notRead
                              )}>
                              {getLastInboxMessage(chat)?.content ||
                                "No messages yet"}
                            </p>
                          </div>
                          {chat?.user?.youAreBlocked && (
                            <span className={styles.youAreBlockedSpan}>🚫</span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
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
          <ChatsList theme={theme} search={search} />
        </div>
      </div>
    </aside>
  );
}

ChatsAside.propTypes = {
  isBlocked: PropTypes.bool,
  theme: PropTypes.string,
};
