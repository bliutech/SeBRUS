import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import { createUser, getUser, changeUser, deleteUser } from "../api/user";

function SignUp() {
  document.title = "signin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formEntries = [
    {
      label: "Username",
      placeholder: "Create a unique username for this website",
      onChange: setUsername,
      onKeyPress: handleEnter,
    },
    {
      label: "Enter Password",
      placeholder: "Enter your password for this website",
      onChange: setPassword,
      onKeyPress: handleEnter,
    },
  ];

  function handleEnter(key) {
    if (key == "Enter") {
      handleSignUp();
    }
  }

  async function handleSignUp() {
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
    <div>
      <b>Sign up!</b>
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
      <input type="button" onClick={() => handleSignUp()}></input>
      <p>{username}</p>
      <p>{password}</p>
    </div>
  );
}

export default SignUp;
