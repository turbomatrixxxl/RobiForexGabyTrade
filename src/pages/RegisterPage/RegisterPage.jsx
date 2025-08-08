import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import leftImage from "../../images/login-background-left-side.png";
import rightImage from "../../images/login-background-right-side.png";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <section className={styles.section}>
      <div className={styles.imageLeft}>
        <img src={leftImage} alt="Left" />
      </div>
      <div className={styles.imageRight}>
        <img src={rightImage} alt="Right" />
      </div>
      <RegisterForm />
    </section>
  );
}
