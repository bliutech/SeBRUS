import { Link } from "react-router-dom";
import React from "react";
import styles from "../styles/components/NavBar.module.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import App from "../App";

function NavBar() {
  const navigate = useNavigate();
  const { auth } = useContext(UserContext);

  async function handleLogin() {
    navigate("/login");
  }

  async function handleSignout() {
    window.alert("You are now logged out");
    removeCookie("session");
    auth = false;
  }

  return (
    <div id={styles.navBar}>
      <div id={styles.bar}>
        <div className={styles.logo}>BlockData</div>
        <li>
          <Link id={styles.navLink} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link id={styles.navLink} to="/datasets">
            Datasets
          </Link>
        </li>
        <li>
          <Link id={styles.navLink} to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link id={styles.navLink} to="/profile">
            Profile
          </Link>
        </li>
        {auth ? (
          <input
            id={styles.but}
            type="button"
            value="Signout"
            onClick={() => handleSignout()}
          ></input>
        ) : (
          <input
            id={styles.but}
            type="button"
            value="Login"
            onClick={() => handleLogin()}
          ></input>
        )}
      </div>
    </div>
  );
}
export default NavBar;
