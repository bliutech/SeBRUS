import { Link } from "react-router-dom";
import React from "react";
import styles from "../styles/components/NavBar.module.css";
import { useCookies } from "react-cookie";

function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies("");
  const auth = cookies.name > 0;

  return (
    <div id={styles.navBar}>
      <div id={styles.bar}>
        <div className={styles.logo}>SeBRUS</div>
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
          <Link id={styles.navLink} to="/contribute">
            Contribute
          </Link>
        </li>
        <li>
          <Link id={styles.navLink} to="/profile">
            Profile
          </Link>
        </li>
        {auth ? (
          <li>
            <Link id={styles.navLink} to="/login">
              <text> Sign out</text>
            </Link>
          </li>
        ) : (
          <li>
            <Link id={styles.navLink} to="/login">
              <text className={styles.regis}>Login/Register</text>
            </Link>
          </li>
        )}
      </div>
    </div>
  );
}
export default NavBar;
