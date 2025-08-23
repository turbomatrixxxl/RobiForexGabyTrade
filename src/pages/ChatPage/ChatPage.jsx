import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import clsx from "clsx";

import { useDispatch } from "react-redux";
import {
  accessChat,
  markGlobalChatAsRead,
  updateChat,
} from "../../redux/public/chatsSlice";
import { useParams } from "react-router-dom";
import { useChats } from "../../hooks/useChats";

import ChatsAside from "../../components/ChatsAside/ChatsAside";
import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/commonComponents/ChatInput";

import { FaPaperclip, FaRegSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const { chats } = useChats();

  const { chatId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fileInputRef = useRef();
  const blockRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [showBlockMsg, setShowBlockMsg] = useState(false);
  const [showYouAreBlockMsg, setShowYouAreBlockMsg] = useState(false);

  const user = chats.find((u) => u.id === chatId);

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

  useEffect(() => {
    if (chatId) {
      dispatch(accessChat({ chatId }));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (chatId === "global") {
      dispatch(markGlobalChatAsRead({ chatId }));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (!chatId) {
      navigate("/home/chat/global");
    }
  }, [navigate, chatId, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (blockRef.current && !blockRef.current.contains(event.target)) {
        setShowBlockMsg(false);
        setShowYouAreBlockMsg(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [blockRef]);

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
        <ChatsAside
          isBlocked={user?.user?.isBlocked || user?.user?.youAreBlocked}
          theme={theme}
        />
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

        <div ref={blockRef} className={styles.sendButtonCont}>
          {user?.user?.isBlocked &&
            !user?.user?.youAreBlocked &&
            showBlockMsg && (
              <p className={styles.blockSpan}>
                🚫 You have blocked <b>{user?.user?.name} !</b> Find them in{" "}
                <b>Chats List → Settings</b> and unblock to send messages.
              </p>
            )}
          {chatId !== "global" &&
            user?.user?.youAreBlocked &&
            showYouAreBlockMsg && (
              <p className={styles.blockSpan}>
                🚫 You are blocked by <b>{user?.user?.name} !</b>
                You cannot send messages to them.
              </p>
            )}
          {chatId === "global" && showYouAreBlockMsg && (
            <p className={styles.blockSpan}>
              🚫 You are blocked by <b>Admin !</b>
              You cannot send messages to <b>Global !</b> Please, contact{" "}
              <b>Admin</b> for more info...!
            </p>
          )}
          <button
            type="button"
            className={clsx(
              styles.sendMsgButton,
              (user?.user?.isBlocked || user?.user?.youAreBlocked) &&
                styles.sendBlocked
            )}
            onClick={() => {
              !user?.user?.isBlocked &&
                !user?.user?.youAreBlocked &&
                handleSendMsg();
              if (user?.user?.isBlocked && !user?.user?.youAreBlocked) {
                setShowBlockMsg(!showBlockMsg);
                setShowYouAreBlockMsg(false);
              }
              if (user?.user?.youAreBlocked) {
                setShowYouAreBlockMsg(!showYouAreBlockMsg);
                setShowBlockMsg(false);
              }
            }}>
            <FaPaperPlane className={styles.sendIcon} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
