import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useChats } from "../../hooks/useChats";

import gaby from "../../images/teamMembersPhoto/Roby.jpg";

import styles from "./ActiveChatModal.module.css";

export default function ActiveChatModal({ chats, closeModal }) {
  const modalRef = useRef();
  const { visitedChatIds } = useChats();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const activeChats = chats.filter((chat) => visitedChatIds.includes(chat.id));

  return (
    <div ref={modalRef}>
      {activeChats.length === 0 ? (
        <p className={styles.noActive}>There are no active chats !</p>
      ) : (
        <ul className={styles.chatList}>
          {activeChats.map((chat) => (
            <li key={chat.id} className={styles.chatListItem}>
              <Link to={`/home/chat/${chat.id}`} onClick={closeModal}>
                <img
                  src={chat.id === "admin" ? gaby : chat?.user?.avatar}
                  alt="Avatar"
                  className={styles.avatar}
                  loading="lazy"
                />
                <div className={styles.usersInfo}>
                  <span className={styles.userName}>{chat?.user?.name}</span>
                  <span className={styles.reply}>Reply...</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ActiveChatModal.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
};
