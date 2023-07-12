import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom/client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import styles from "../styles/components/RegistrationForm.module.css";
import { createUser, getUser, changeUser, deleteUser } from "../api/user";

function Registration() {
  document.title = "registration";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleEnter(key) {
    if (key == "Enter") {
      handleRegistration();
    }
  }

  async function handleRegistration() {
    if (!username) {
      window.alert("Your username must be 6+ characters long");
      return;
    }

    const user = await getUser(username);
    if (user.password !== null || user.password.length) {
      window.alert("This username is taken." + "Please try a different one");
      return;
    }
  }

  return (
    <div
      className={styles.rounded}
      style={{
        border: "1px solid white",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      <b>Registrate</b>
      <span>
        <p>Username:</p>{" "}
        <input
          className={styles.entrybox}
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </span>
      <span>
        <p>Password:</p>{" "}
        <input
          className={styles.entrybox}
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </span>
      <p></p>
      <input
        className={styles.but}
        type="button"
        value="Submit"
        onClick={() => handleEnter()}
      ></input>
      {/* <p>{username}</p> */}
      {/* <p>{password}</p> */}
    </div>
  );
}

export default Registration;
