import { useState } from "react";
import Modal from "../ModalFooter/ModalFooter";
// import { useAuth } from "../../hooks/useAuth";

import styles from "./Footer.module.css";
import clsx from "clsx";

const Footer = ({ style, sharedFooter }) => {
  const [modalOpen, setModalOpen] = useState(false); // Starea pentru a ține evidența dacă modalul este deschis sau nu
  // const { user } = useAuth();

  const theme = localStorage.getItem("theme") || "dark"; // Get theme from user or localStorage

  const handleTextClick = () => {
    setModalOpen(true); // Deschide modalul la click
  };

  return (
    <footer
      style={style}
      className={clsx(
        styles.footer,
        sharedFooter === true ? styles.sharedFooter : null,
        theme === "light" || theme === "violet" ? styles.light : null
      )}>
      <div
        onClick={handleTextClick}
        className={clsx(
          styles.footerText,
          theme === "light" || theme === "violet" ? styles.lightText : null
        )}>
        <p>℗ & © RobiForexGabyTrade</p>
        <p>Powered by RobiTrader Team</p>
      </div>
      {/* Randează Modal-ul dacă este deschis */}
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </footer>
  );
};

export default Footer;
