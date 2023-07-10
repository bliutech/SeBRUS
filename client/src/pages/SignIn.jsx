import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

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
    <div>
      <b>Sign in!</b>
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
    </div>
  );
}

export default SignIn;
