import React, { useRef, useEffect } from "react";

import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import styles from "./ConversationsPage.module.css";

export default function ConversationsPage() {
  const { chatId } = useParams();
  const { chats } = useChats();
  const { file } = useOutletContext();

  const messagesEndRef = useRef(null);

  const selectedChat = chats.find((chat) => chat.id === chatId);

  const messages = selectedChat?.messages || [];

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

  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(formatTimestamp(a.sentAt)).getTime();
    const dateB = new Date(formatTimestamp(b.sentAt)).getTime();
    return dateA - dateB; // de la cel mai vechi la cel mai nou
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  if (!selectedChat) {
    return <div className={styles.notFound}>Chat not found</div>;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
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
                {user ? user.username : "User"}
              </span>
              <span className={styles.msgOutboxContent}>{msg.content}</span>
              <span className={styles.timestampOutbox}>
                {msg.sentAt
                  ? formatTimestamp(msg.sentAt)
                  : "Time not available"}
              </span>
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
