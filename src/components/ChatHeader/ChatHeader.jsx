import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useChats } from "../../hooks/useChats";

import clsx from "clsx";

import ActiveChatModal from "../ActiveChatModal/ActiveChatModal";

import { FaEllipsisH } from "react-icons/fa";

import gaby from "../../images/teamMembersPhoto/Roby.jpg";

import styles from "./ChatHeader.module.css";

function ChatHeader() {
  const { chatId } = useParams();
  const { chats } = useChats();
  const selectedChat = chats.find((chat) => chat.id === chatId);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className={clsx(styles.header)}>
      {showModal && <ActiveChatModal chats={chats} closeModal={toggleModal} />}

      {selectedChat && (
        <div className={styles.chatInfo}>
          <img
            src={selectedChat.id === "admin" ? gaby : selectedChat.user.avatar}
            alt="Avatar"
            className={styles.avatar}
          />
          <div className={styles.usersInfo}>
            <span className={styles.userName}>{selectedChat.user.name}</span>
            <span className={styles.reply}>Reply</span>
          </div>
        </div>
      )}
      <button className={clsx(styles.rightContButton)} onClick={toggleModal}>
        <FaEllipsisH size={16} className={styles.button} />
      </button>
    </div>
  );
}

export default ChatHeader;
