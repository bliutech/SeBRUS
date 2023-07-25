import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DataContext } from "./DataProvider";

import styles from "../styles/components/NavBar.module.css";

function NavBar() {
  const navigate = useNavigate();
  const { auth, deleteData, accounts, connectWallet } = useContext(DataContext);

  async function handleLogin() {
    navigate("/login");
  }

  async function handleLogout() {
    window.alert("You are now logged out");
    await deleteData();
    navigate("/");
  }

  return (
    <div id={styles.navBar}>
      <div id={styles.bar}>
        <li>
          <Link id={styles.logo} to="/">
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
            <Link id={styles.navLink} to="/create">
              Create a Dataset
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
            <button
              className={styles.authButton}
              onClick={() => connectWallet()}
            >
              {accounts.length !== 0 ? "Connected" : "Connect to Metamask"}
            </button>
          </li>
        ) : null}
        {auth ? (
          <li>
            <button
              className={styles.authButton}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <button className={styles.authButton} onClick={() => handleLogin()}>
              Login
            </button>
          </li>
        )}
      </div>
    </div>
  );
}
export default NavBar;
