import React, { useEffect, useRef } from "react";
import styles from "./ModalFooter.module.css";
// import { useMediaQuery } from "react-responsive";
import ModalLogo from "../commonComponents/FooterLogo/FooterLogo";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import FormButton from "../commonComponents/FormButton/FormButton";
import "animate.css";

// Corectarea importului imaginii
import Radu from "../../images/teamMembersPhoto/Radu.webp";
import Adrian from "../../images/teamMembersPhoto/Adrian.jpg";

const ModalFooter = ({ closeModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const addCloseEvent = (event) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", addCloseEvent);
    };
  });

  const closeOnClickOutside = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  // const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  const animation = "animate__animated animate__fadeInDown animate__slow";

  return (
    <div
      className={styles.modalFooter}
      onClick={closeOnClickOutside}
      ref={modalRef}>
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {/* {screenCondition && <ModalLogo variant={"formLogo"} />} */}
          <ModalLogo variant={"formLogo"} />
          <h2>RobiTrader Team:</h2>

          <div className={styles.footerCards}>
            {/* Card pentru Roby */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.Adrian}`}>
              <img
                src={Adrian} // Folosește variabila corectă pentru imagine
                alt="Anton Robert"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>Anton Robert</span>
              <em className={styles.footerTeamFunction}>Project Manager</em>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/SecaraAdrian"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaGithub />
                </a>
                <a
                  href="http://linkedin.com/in/adrian-secara-254ba3312"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaLinkedin />
                </a>
                <a
                  href="tel:+40759337248"
                  className={styles.footerPhoneIcon}
                  aria-label="Phone">
                  <FaPhoneAlt />
                </a>
              </div>
            </div>

            {/* Card pentru Radu */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.Radu}`}>
              <a
                href="https://radubogdannaramzoiu.link"
                aria-label="My e visit-card"
                target="_blank"
                rel="noreferrer noopener">
                <img
                  src={Radu} // Folosește variabila corectă pentru imagine
                  alt="Radu"
                  className={styles.teamMemberImage}
                />
              </a>

              <span className={styles.footerTeamName}>
                Naramzoiu Radu Bogdan
              </span>
              <em className={styles.footerTeamFunction}>Team Leader</em>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/turbomatrixxxl"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/radu-bogdan-naramzoiu-fullstack-developer/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaLinkedin />
                </a>
                <a
                  href="tel:+40771392871"
                  className={styles.footerPhoneIcon}
                  aria-label="Phone">
                  <FaPhoneAlt />
                </a>
              </div>
            </div>

            {/* Adaugă alte carduri pentru membrii echipei dacă este necesar */}
          </div>

          <FormButton
            type={"button"}
            text={"Thank You"}
            variant={"whiteButtton"}
            handlerFunction={() => closeModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;
