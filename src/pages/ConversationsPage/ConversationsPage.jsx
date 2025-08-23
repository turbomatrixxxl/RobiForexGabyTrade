import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import roby from "../../images/Roby.jpg";

import styles from "./ConversationsPage.module.css";
import { addUser } from "../../redux/public/chatsSlice";

export default function ConversationsPage() {
  const { chatId } = useParams();
  const { chats } = useChats();
  const { file } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const selectedChat = chats.find((chat) => chat.id === chatId);

  const messages = selectedChat?.messages || [];

  const globalChat = chats.find((chat) => chat.id === "global");

  const globalMessages = [];

  if (globalChat) {
    globalChat.users?.forEach((us) => {
      const userInfo = { chatId: us.id, user: us.user };
      us.messages.forEach((msg) => {
        globalMessages.push({ ...userInfo, ...msg });
      });
    });
  }

  // console.log("globalMessages :", globalMessages);

  const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      const fixedTimestamp = timestamp.replace(
        /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):(\d{2})\.(\d{3})Z$/,
        "$1:59.$3Z"
      );
      date = new Date(fixedTimestamp);
    }
    if (isNaN(date.getTime())) return "";

    if (date.getSeconds() > 59) date.setSeconds(59);

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}-${formattedTime}`;
  };

  const sortedGlolbalMessages = [...globalMessages].sort((old, neww) => {
    const oldestMsg = new Date(formatTimestamp(old.sentAt));
    const newestMsg = new Date(formatTimestamp(neww.sentAt));

    return oldestMsg - newestMsg;
  });

  // console.log("sortedGlolbalMessages :", sortedGlolbalMessages);

  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(formatTimestamp(a.sentAt)).getTime();
    const dateB = new Date(formatTimestamp(b.sentAt)).getTime();
    return dateA - dateB; // de la cel mai vechi la cel mai nou
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  useEffect(() => {
    if (!selectedChat) {
      navigate("/home/chat/global", { replace: true });
    }
  }, [selectedChat, navigate]);

  if (!selectedChat) {
    return <div className={styles.notFound}>Chat not found</div>;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const theme = localStorage.getItem("theme") || "dark";

  // const slowNav = setTimeout(() => {
  //   return `home/chats/${msg.chatId}`;
  // },1000)

  return chatId !== "global" ? (
    <div className={styles.chatPage}>
      <ul className={styles.messageList}>
        {sortedMessages.map((msg) =>
          msg.isInbox ? (
            <li key={msg.id} className={styles.inbox}>
              <span className={clsx(styles.ownerName, styles.left)}>
                {selectedChat?.user.name ?? ""}
              </span>
              <span className={styles.msgInboxContent}>{msg.content}</span>
              <span className={styles.timestampInbox}>
                {msg.sentAt
                  ? formatTimestamp(msg.sentAt)
                  : "Time not available"}
              </span>
            </li>
          ) : (
            <li key={msg.id} className={styles.outbox}>
              <span className={clsx(styles.ownerName, styles.right)}>
                {user ? user?.username : "User"}
              </span>
              <span className={styles.msgOutboxContent}>{msg?.content}</span>
              <div className={styles.timestampOutboxCont}>
                {msg?.isRead ? (
                  <span
                    className={clsx(
                      styles.timestampOutbox,
                      theme === "light"
                        ? styles.timestampOutboxLight
                        : styles.read
                    )}>
                    ✔✔
                  </span>
                ) : (
                  <span
                    className={clsx(
                      styles.timestampOutbox,
                      msg?.sentAt && theme === "light"
                        ? styles.timestampOutboxLight
                        : styles.sent
                    )}>
                    ✔
                  </span>
                )}
                <span className={styles.timestampOutbox}>
                  {msg?.sentAt
                    ? formatTimestamp(msg?.sentAt)
                    : "Time not available"}
                </span>
              </div>
            </li>
          )
        )}

        {file && (
          <li className={styles.filePreview}>
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="File Preview"
                className={styles.imagePreview}
              />
            ) : (
              <span>{file.name}</span>
            )}
          </li>
        )}

        {/* Referință pentru scroll */}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  ) : (
    <div className={styles.chatPage}>
      <ul className={styles.messageList}>
        {sortedGlolbalMessages.map((msg, index) =>
          msg.isInbox ? (
            <li key={`${msg?.id}-${index}-glo`} className={styles.inbox}>
              <button
                type="button"
                onClick={() => {
                  dispatch(addUser({ chatId: msg?.chatId }));
                  setTimeout(() => {
                    navigate(`/home/chat/${msg.chatId}`);
                  }, 500);
                }}
                className={styles.inboxUserCont}>
                <img
                  className={styles.inboxUserImg}
                  src={msg?.user?.avatar ?? roby}
                  alt="Avatar"
                />
                <span className={clsx(styles.ownerName, styles.left)}>
                  {msg?.user?.name ?? "User"}
                </span>
              </button>

              <span className={styles.msgInboxContent}>{msg.content}</span>
              <span className={styles.timestampInbox}>
                {msg.sentAt
                  ? formatTimestamp(msg.sentAt)
                  : "Time not available"}
              </span>
            </li>
          ) : (
            <li key={`${msg?.id} - ${index}-bal`} className={styles.outbox}>
              <span className={clsx(styles.ownerName, styles.right)}>
                {user ? user?.username : "Me"}
              </span>
              <span className={styles.msgOutboxContent}>{msg?.content}</span>
              <div className={styles.timestampOutboxCont}>
                {msg?.isRead ? (
                  <span
                    className={clsx(
                      styles.timestampOutbox,
                      theme === "light"
                        ? styles.timestampOutboxLight
                        : styles.read
                    )}>
                    ✔✔
                  </span>
                ) : (
                  <span
                    className={clsx(
                      styles.timestampOutbox,
                      msg?.sentAt && theme === "light"
                        ? styles.timestampOutboxLight
                        : styles.sent
                    )}>
                    ✔
                  </span>
                )}
                <span className={styles.timestampOutbox}>
                  {msg?.sentAt
                    ? formatTimestamp(msg?.sentAt)
                    : "Time not available"}
                </span>
              </div>
            </li>
          )
        )}

        {file && (
          <li className={styles.filePreview}>
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="File Preview"
                className={styles.imagePreview}
              />
            ) : (
              <span>{file.name}</span>
            )}
          </li>
        )}

        {/* Referință pentru scroll */}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}
