import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import clsx from "clsx";

import { useDispatch } from "react-redux";
import { updateChat } from "../../redux/public/chatsSlice";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";

import ChatsAside from "../../components/ChatsAside/ChatsAside";
import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/commonComponents/ChatInput";

import { FaPaperclip, FaRegSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const { chats } = useChats();

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const user = chats.find((u) => u.id === chatId);

  useEffect(() => {
    if (user) {
      setIsBlocked(user?.user?.isBlocked || false);
    }
  }, [user]);

  // console.log(isBlocked);

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
      <ChatHeader theme={theme} />
      <div className={clsx(styles.content)}>
        <ChatsAside isBlocked={isBlocked} theme={theme} />
        <section className={styles.main}>
          <Outlet context={{ file }} />
        </section>
      </div>
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

        <button
          disabled={isBlocked}
          type="button"
          className={clsx(
            styles.sendMsgButton,
            isBlocked && styles.sendBlocked
          )}
          onClick={handleSendMsg}>
          <FaPaperPlane className={styles.sendIcon} size={18} />
        </button>
      </div>
    </div>
  );
}
