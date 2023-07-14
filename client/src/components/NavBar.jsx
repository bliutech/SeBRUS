import React from "react";
import styles from "../styles/components/NavBar.module.css";

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
          <a id={styles.navLink} href="/datasets">
            Datasets
          </a>
        </li>
        <li>
          <a id={styles.navLink} href="/dashboard">
            Dashboard
          </a>
        </li>
        <li>
          <a id={styles.navLink} href="/profile">
            Profile
          </a>
        </li>
        <li>
          <a id={styles.navLink} href="/login">
            <text className={styles.regis}>Login/Register</text>
          </a>
        </li>
      </div>
    </div>
  );
}
export default NavBar;
