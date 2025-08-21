import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";

import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  accessChat,
  toggleBlockUser,
  deleteUser,
  markChatAsRead,
} from "../../redux/public/chatsSlice"; // Assuming this is your async action

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import safeToDate from "../../utils/safeToDate";

import { FaCog } from "react-icons/fa";

import roby from "../../images/Roby.jpg";
import gaby from "../../images/teamMembersPhoto/Roby.jpg";

import styles from "./ChatsList.module.css";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
  desktop: "(min-width:1115px)",
};
export default function ChatsList({ search, theme }) {
  const { chats } = useChats();
  const { chatId } = useParams();
  const modalRef = useRef(null);

  const navigate = useNavigate();

  const [reloadMap, setReloadMap] = useState({});
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const dispatch = useDispatch();

  // console.log("chats :", chats);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSettingsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const isMobile = useMediaQuery({ query: breakpoints.mobile });

  const handleImageError = (chatId) => {
    setTimeout(() => {
      setReloadMap((prev) => ({
        ...prev,
        [chatId]: (prev[chatId] || 0) + 1,
      }));
    }, 1000);
  };

  // var 1 cu reduce
  // const getLastInboxMessage = (chat) => {
  //   const inboxMessages = chat?.messages?.filter((msg) => msg?.isInbox);
  //   if (!inboxMessages?.length) return null;
  //   const lastInboxMessage = inboxMessages?.reduce((latest, msg) =>
  //     new Date(safeToDate(msg.sentAt)) > new Date(safeToDate(latest.sentAt))
  //       ? msg
  //       : latest
  //   );

  //   console.log(lastInboxMessage);

  //   return lastInboxMessage;
  // };

  // var 2 cu reduce
  // function getLastInboxMessage(chat) {
  //   const inbox = chat?.messages?.filter((m) => m?.isInbox) ?? [];
  //   if (!inbox.length) return null;

  //   return inbox.reduce((latest, msg) => {
  //     const dMsg = safeToDate(msg.sentAt);
  //     const dLatest = safeToDate(latest.sentAt);
  //     if (!dLatest) return msg; // dacă latest e invalid, ia msg
  //     if (!dMsg) return latest; // dacă msg e invalid, păstrează latest
  //     return dMsg > dLatest ? msg : latest;
  //   });
  // }

  // var 3 cu sort
  // const getLastInboxMessage = (chat) => {
  //   if (!chat?.messages) return null;

  //   const inboxMessages = chat.messages.filter((msg) => msg?.isInbox);
  //   if (!inboxMessages.length) return null;

  //   const sortedInboxMessages = inboxMessages
  //     .slice() // copie ca să nu modifici array-ul original
  //     .sort((a, b) => safeToDate(a.sentAt) - safeToDate(b.sentAt));

  //   return sortedInboxMessages[sortedInboxMessages.length - 1] || null;
  // };

  // var 4 a mea cu sort
  const getLastInboxMessage = (chat) => {
    const inboxMessages = chat?.messages?.filter((msg) => msg?.isInbox);
    if (!inboxMessages?.length) return null;
    const sortedInboxMessages = inboxMessages?.sort(
      (a, b) => safeToDate(a.sentAt) - safeToDate(b.sentAt)
    );

    // console.log("lastInboxMessage :", sortedInboxMessages);
    const indexOfLastMessage = Number(sortedInboxMessages.length - 1);

    // console.log(indexOfLastMessage);

    return sortedInboxMessages[indexOfLastMessage];
  };

  const filteredChats = chats?.filter((chat) =>
    chat?.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  function handleClick() {
    setIsSettingsVisible(!isSettingsVisible);
  }
  function toggleBlock() {
    dispatch(toggleBlockUser({ chatId }));
  }

  function deletehat() {
    dispatch(deleteUser({ chatId }));
  }

  return (
    <ul className={styles.list}>
      {filteredChats.map((chat) => (
        <li key={chat.id}>
          <NavLink
            to={`/home/chat/${chat.id}`}
            className={({ isActive }) =>
              clsx(styles.listItem, {
                [styles.active]: isActive,
                [styles.isBlocked]: chat?.user?.isBlocked, // folosește starea userului din chat
              })
            }
            onClick={() => {
              dispatch(accessChat({ chatId: chat.id }));
              dispatch(markChatAsRead({ chatId }));
            }}>
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
              <p
                className={clsx(
                  styles.lastMessage,
                  getLastInboxMessage(chat)?.isRead === false && styles.notRead
                )}>
                {getLastInboxMessage(chat)?.content || "No messages yet"}
              </p>
            </div>
            {chat?.id !== "admin" && chat?.id !== "global" && (
              <div className={styles.settingsCont}>
                <button
                  onClick={handleClick}
                  type="button"
                  className={styles.btnCont}>
                  <FaCog
                    size={isMobile ? 12 : 18}
                    color="#161616cc"
                    className={styles.cogIcon}
                  />
                </button>
                {isSettingsVisible && chat?.id === chatId && (
                  <div
                    ref={modalRef}
                    className={clsx(
                      styles.modalCont,
                      theme === "dark" && styles.modalContDark,
                      theme === "violet" && styles.modalContViolet
                    )}>
                    <button
                      type="button"
                      className={clsx(
                        styles.modalBtn,
                        chat?.user?.isBlocked
                          ? styles.modalBtnB
                          : styles.modalBtnNb
                      )}
                      onClick={toggleBlock}>
                      {chat?.user?.isBlocked ? `Unblock...🔓` : `Block...🚫`}
                    </button>
                    <button
                      type="button"
                      className={clsx(
                        styles.modalBtn,
                        theme !== "light" && styles.modalBtnNotLight
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        deletehat();
                        navigate("/home/chat");
                      }}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

ChatsList.propTypes = {
  search: PropTypes.string,
  theme: PropTypes.string,
};
