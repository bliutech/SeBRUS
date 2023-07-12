import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import "../styles/index.css";
import styles from "../styles/components/LoginForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUser, changeUser, deleteUser } from "../api/user";

function Login() {
  document.title = "login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleEnter(key) {
    if (key == "Enter") {
      handleLogin();
    }
  }

  async function handleLogin() {
    if (!username) {
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
      <br></br>
      <header>Login</header>
      <br></br>
      <br></br>
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

export default Login;
