import { Link } from "react-router-dom";
import React from "react";
import styles from "../styles/components/NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./DataProvider";

function NavBar() {
  const navigate = useNavigate();
  const { auth, deleteData, accounts, connectWallet } = useContext(DataContext);

  async function handleLogin() {
    navigate("/login");
  }

  async function handleSignout() {
    window.alert("You are now logged out");
    await deleteData();
    navigate("/");
  }

  return (
    <div id={styles.navBar}>
      <div id={styles.bar}>
        <li>
          <Link id={styles.navLink} to="/">
            <div className={styles.logo}>SeBRUS</div>
          </Link>
        </li>
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/dashboard">
              Dashboard
            </Link>
          </li>
        ) : null}
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/datasets">
              Datasets
            </Link>
          </li>
        ) : null}
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/contribute">
              Contribute
            </Link>
          </li>
        ) : null}
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/profile">
              Profile
            </Link>
          </li>
        ) : null}
        {auth ? (
          <li>
            <button onClick={() => connectWallet()}>
              {accounts.length !== 0 ? "Connected" : "Connect to Metamask"}
            </button>
          </li>
        ) : null}
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
