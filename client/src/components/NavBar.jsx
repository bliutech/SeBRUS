import { Link } from "react-router-dom";
import React from "react";
import styles from "../styles/components/NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import App from "../App";
import { deleteUser } from "../api/user";
import { DataContext } from "./DataProvider";

function NavBar() {
  const navigate = useNavigate();
  // const auth = useContext(UserContext);
  const auth = true;

  const { updateData } = useContext(DataContext);

  async function handleLogin() {
    navigate("/login");
  }

  async function handleSignout() {
    window.alert("You are now logged out");
    deleteUser();
    updateData();
  }

  return (
    <div id={styles.navBar}>
      <div id={styles.bar}>
        <div className={styles.logo}>SeBRUS</div>
        <li>
          <Link id={styles.navLink} to="/">
            Home
          </Link>
        </li>
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/datasets">
              Datasets
            </Link>
          </li>
        ) : null}
        <li>
          <Link id={styles.navLink} to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link id={styles.navLink} to="/contribute">
            Contribute
          </Link>
        </li>
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/profile">
              Profile
            </Link>
          </li>
        ) : null}
        {auth ? ( // FIX THIS!!! replace true with auth
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
