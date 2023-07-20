import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pages/ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function ProfilePage() {
  document.title = "Profile | SeBRUS";

  const navigate = useNavigate();

  function handleSignout() {
    navigate("/");
  }

  return (
    <div className={styles.profPage}>
      <p class={styles.acctText}>{"test"}'s Account</p>
      <input
        type="button"
        class={styles.but}
        value="Signout"
        onClick={() => handleSignout()}
      ></input>
    </div>
  );
}

export default ProfilePage;

// **** button needs prettyification ****
