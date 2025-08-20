import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateChat } from "../../redux/public/chatsSlice";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";
import ChatInput from "../../components/commonComponents/ChatInput";

import { FaPaperclip, FaRegSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

import styles from "./ConversationsPage.module.css";
import clsx from "clsx";

export default function ConversationsPage() {
  const { chatId } = useParams();
  const { chats } = useChats();
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);

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

  const handleSendMsg = () => {
    if (!message.trim()) return;

    dispatch(
      updateChat({
        chatId,
        newMessages: [
          {
            id: crypto.randomUUID(),
            content: message,
            isInbox: false,
            sentAt: new Date().toISOString(),
          },
        ],
      })
    );
    setMessage("");
    setShowEmojiPicker(false);
    setFile(null);
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

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

      <div className={styles.sendMsgCont}>
        <ChatInput
          type="textarea"
          textarea
          width="100%"
          className={styles.sendMsgInput}
          paddingLeft="5px"
          placeholder="Type here..."
          value={message}
          handleChange={(e) => setMessage(e.target.value)}>
          <button
            type="button"
            className={styles.writeMsgButton}
            onClick={handleAttachClick}>
            <FaPaperclip className={styles.paperClipIcon} size={16} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className={styles.emojiWrapper}>
            <button
              type="button"
              className={styles.writeMsgButton}
              onClick={toggleEmojiPicker}>
              <FaRegSmile className={styles.smileIcon} size={16} />
            </button>
            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={250}
                  height={300}
                  previewConfig={{ showPreview: false }}
                  searchPlaceHolder="Search emoji..."
                />
              </div>
            )}
          </div>
        </ChatInput>

        <button className={styles.sendMsgButton} onClick={handleSendMsg}>
          <FaPaperPlane className={styles.sendIcon} size={18} />
        </button>
      </div>
    </div>
  );
}
