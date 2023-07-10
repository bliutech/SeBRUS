import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import '../styles/index.css';
import styles from "../styles/pages/SignInPage.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import { createUser, getUser, changeUser, deleteUser } from "../api/user";

function SignIn() {
  document.title = "signin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formEntries = [
    {
      label: "Username",
      placeholder: "Enter username",
      onChange: setUsername,
      onKeyPress: handleEnter,
    },
    {
      label: "Password",
      placeholder: "Enter password",
      onChange: setPassword,
      onKeyPress: handleEnter,
    },
  ];

  function handleEnter(key) {
    if (key == "Enter") {
      handleSignIn();
    }
  }

  async function handleSignIn() {
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
      <p>
        <br></br>
        <header>Sign In</header>
        <br></br>
        <br></br>
        <span>
          <p>Username:</p>{" "}
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </span>
        <span>
          <p>Password:</p>{" "}
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </span>
        <input type="button" onClick={() => handleSignIn()}></input>
        <p>{username}</p>
        <p>{password}</p>
      </p>
      <form action="/LoginForm.jsx" method="post">
        <text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter your username:&nbsp;
        </text>
        <input
          type="email"
          required
          name="email"
          placeholder="Your email"
        ></input>
        <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
        <br></br>
        <br></br>
        <text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enter your password:&nbsp;
        </text>
        <input
          type="password"
          required
          name="password"
          placeholder="Your password"
        ></input>
        <text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button className={styles.button}>
          <buttonText>Submit</buttonText>
        </button>
        <button>
          <buttonText>test</buttonText>
        </button>
        <br></br>
        <br></br>
      </form>
      <p></p>
    </div>
  );
}

export default SignIn;
