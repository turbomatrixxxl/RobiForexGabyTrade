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
  markGlobalChatAsRead,
} from "../../redux/public/chatsSlice"; // Assuming this is your async action

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import safeToDate from "../../utils/safeToDate";

import { FaCog } from "react-icons/fa";

import roby from "../../images/Roby.jpg";
import gaby from "../../images/teamMembersPhoto/Roby.jpg";
import glob from "../../images/global.png";

import styles from "./ChatsList.module.css";

const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width:768px)",
  desktop: "(min-width:1115px)",
};
export default function ChatsList({ search, theme }) {
  const { chats } = useChats();
  const { chatId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const [reloadMap, setReloadMap] = useState({});
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

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

  useEffect(() => {
    if (chatId) {
      dispatch(markChatAsRead({ chatId }));
    }
  }, [dispatch, chatId]);

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
  // const getLastInboxMessage = (chat) => {
  //   const inboxMessages = chat?.messages?.filter((msg) => msg?.isInbox);
  //   if (!inboxMessages?.length) return null;
  //   const sortedInboxMessages = inboxMessages?.sort(
  //     (a, b) => safeToDate(a.sentAt) - safeToDate(b.sentAt)
  //   );

  //   // console.log("lastInboxMessage :", sortedInboxMessages);
  //   const indexOfLastMessage = Number(sortedInboxMessages.length - 1);

  //   // console.log(indexOfLastMessage);

  //   return sortedInboxMessages[indexOfLastMessage];
  // };

  // var 5 cu reduce
  function getLastInboxMessage(chat) {
    const inboxMessages = chat?.messages?.filter((m) => m?.isInbox) || [];
    if (!inboxMessages.length) return null;

    return inboxMessages.reduce((latest, msg) => {
      const dateMsg = safeToDate(msg.sentAt);
      const dateLatest = safeToDate(latest.sentAt);

      if (!dateMsg) return latest; // mesaj corupt → ignoră
      if (!dateLatest) return msg; // latest corupt → ia msg

      return dateMsg > dateLatest ? msg : latest;
    }, inboxMessages[0]);
  }

  const filteredChats = (chats || []).filter((chat) => {
    if (chat?.id === "global" || chat?.id === "admin") {
      return false;
    }
    return chat?.user?.name?.toLowerCase().includes(search.toLowerCase());
  });

  // console.log("filteredChats :", filteredChats);

  const adminChats = chats?.filter((chat) => chat?.id === "admin");

  // console.log("adminChats :", adminChats);

  const globalChats = chats?.find((chat) => chat?.id === "global");
  const globalMessages = [];

  // globalChats?.users?.map((user) => {
  //   const userMessages = [];
  //   const userInfo = { userId: user?.id, user: user?.user };
  //   user?.messages.map((msg) => {
  //     const completeDataMsg = { ...msg, ...userInfo };
  //     return userMessages.push(completeDataMsg);
  //   });
  //   return globalMessages.push(...userMessages);
  // });

  globalChats?.users?.forEach((us) => {
    const userInfo = { userId: us?.id, user: us?.user };
    us?.messages?.forEach((msg) => {
      globalMessages.push({ ...msg, ...userInfo });
    });
  });

  // console.log("globalMessages :", globalMessages);

  // console.log("globalChats :", globalChats);

  function getLastGlobalInboxMessage(globalMessages) {
    if (!globalMessages?.length) return null;

    return globalMessages
      .filter((msg) => msg.isInbox)
      .reduce((latest, msg) => {
        const latestDate = new Date(latest.sentAt);
        const msgDate = new Date(msg.sentAt);
        return msgDate > latestDate ? msg : latest;
      });
  }

  const lastGlobalMessage = getLastGlobalInboxMessage(globalMessages);

  // console.log("lastGlobalMessage :", lastGlobalMessage);

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
      {adminChats?.length > 0 ? (
        adminChats.map((chat) => (
          <li key={chat.id}>
            <NavLink
              to={`/home/chat/${chat.id}`}
              className={({ isActive }) =>
                clsx(styles.listItem, {
                  [styles.active]: isActive,
                  [styles.youAreBlocked]: chat?.user?.youAreBlocked,
                })
              }
              onClick={() => {
                dispatch(accessChat({ chatId: chat.id }));
                dispatch(markChatAsRead({ chatId }));
              }}>
              <div className={styles.imgCont}>
                <img
                  key={"admin"}
                  className={styles.userImg}
                  src={gaby}
                  alt="Admin img"
                  loading="lazy"
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
                    getLastInboxMessage(chat)?.isRead === false &&
                      styles.notRead
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
              {chat?.user?.youAreBlocked && (
                <span className={styles.youAreBlockedSpan}>🚫</span>
              )}
              {chat?.user?.isBlocked && (
                <span className={styles.isBlockedSpan}>🚫</span>
              )}
            </NavLink>
          </li>
        ))
      ) : (
        <li className={styles.empty}>No chats found</li>
      )}
      <li key={"global"}>
        <NavLink
          to={"/home/chat/global"}
          className={({ isActive }) =>
            clsx(styles.listItem, styles.globalLink, {
              [styles.active]: isActive,
            })
          }
          onClick={() => {
            dispatch(markGlobalChatAsRead({ chatId }));
          }}>
          <div className={styles.imgCont}>
            <img
              className={clsx(styles.userImg, styles.global)}
              src={glob}
              alt="User Global img"
              loading="lazy"
            />
            <div className={clsx(styles.isOnline, styles.online)}></div>
          </div>
          <div className={styles.infoCont}>
            <p className={styles.name}>Global</p>
            <p
              className={clsx(
                styles.lastMessage,
                !lastGlobalMessage?.isRead && styles.notRead
              )}>
              {lastGlobalMessage.content || "No messages yet"}
            </p>
          </div>

          {globalChats.user?.youAreBlocked && (
            <span className={styles.youAreBlockedSpan}>🚫</span>
          )}
        </NavLink>
      </li>
      {filteredChats?.length > 0 ? (
        filteredChats.map((chat) => (
          <li key={chat.id}>
            <NavLink
              to={`/home/chat/${chat.id}`}
              className={({ isActive }) =>
                clsx(styles.listItem, {
                  [styles.active]: isActive,
                  [styles.isBlocked]: chat?.user?.isBlocked,
                  [styles.youAreBlocked]: chat?.user?.youAreBlocked,
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
                    getLastInboxMessage(chat)?.isRead === false &&
                      styles.notRead
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
              {chat?.user?.youAreBlocked && (
                <span className={styles.youAreBlockedSpan}>🚫</span>
              )}
              {chat?.user?.isBlocked && (
                <span className={styles.isBlockedSpan}>🚫</span>
              )}
            </NavLink>
          </li>
        ))
      ) : (
        <li className={styles.empty}>No chats found</li>
      )}
    </ul>
  );
}

ChatsList.propTypes = {
  search: PropTypes.string,
  theme: PropTypes.string,
};
