import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styles from "../styles/components/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function ProfilePage() {
  const navigate = useNavigate();
  document.title = "Account";
  const [cookies, setCookie, removeCookie] = useCookies("");

  function handleSignout() {
    removeCookie("name");
    navigate("/");
  }

  return (
    <div>
      <p>{cookies.name}'s account</p>
      <li>
        <input
          type="button"
          id={styles.button}
          placeholder="Signout"
          onClick={() => handleSignout()}
        ></input>
      </li>
    </div>
  );
}

export default ProfilePage;

// **** button needs prettyification ****
