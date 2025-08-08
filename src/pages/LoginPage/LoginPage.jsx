import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

import "react-toastify/dist/ReactToastify.css";

import leftImage from "../../images/login-background-left-side.png";
import rightImage from "../../images/login-background-right-side.png";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  // Dependency array ensures the effect runs when these values change.

  return (
    <section className={styles.section}>
      <div className={styles.imageLeft}>
        <img src={leftImage} alt="Left" />
      </div>
      <div className={styles.imageRight}>
        <img src={rightImage} alt="Right" />
      </div>
      <LoginForm />
    </section>
  );
}
