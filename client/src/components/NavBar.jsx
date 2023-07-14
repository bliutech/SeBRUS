import { Link } from "react-router-dom";
import React from "react";
import styles from "../styles/components/NavBar.module.css";
import Login from "../components/LoginForm";

function NavBar() {
  return (
    <div id={styles.navBar}>
      <div id={styles.bar}>
        <div className={styles.logo}>BlockData</div>
        <li>
          <a id={styles.navLink} href="/">
            Home
          </a>
        </li>
        <li>
          <a id={styles.navLink} href="/login">
            Login
          </a>
        </li>
        <li>
          <a id={styles.navLink} href="/registration">
            <text className={styles.regis}>Register</text>
          </a>
        </li>
      </div>
    </div>
  );
}
export default NavBar;
