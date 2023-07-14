// import { Link } from "react-router-dom";
// import * as ReactDOM from "react-dom/client";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import styles from "../styles/components/RegistrationForm.module.css";
import { createUser, getUser } from "../api/user";
import { useState, createContext, useContext } from "react";

function Registration() {
  document.title = "Registration";

  const UserContext = createContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies("");
  // const auth = useContext(UserContext);

  function handleEnter(key) {
    if (key === "Enter") {
      handleRegistration();
    }
  }

  async function handleRegistration() {
    if (!username || username.length < 6) {
      window.alert("Your username must be 6+ characters long");
      return;
    }

    const user = await getUser(username);
    if (user.password !== null) {
      window.alert("This username is taken. \n Please try a different one");
      return;
    } else {
      createUser(username, password);
      setCookie("name", username);
    }
  }

  return (
    <div className={styles.rounded}>
      <b>Register</b>
      <span>
        <p>Username:</p>{" "}
        <input
          className={styles.Input}
          placeholder="Enter a unique username"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </span>
      <span>
        <p>Password:</p>{" "}
        <input
          className={styles.Input}
          placeholder="Enter a password"
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </span>
      <p></p>
      <input
        className={styles.but}
        type="button"
        value="Registrate"
        onClick={() => handleEnter()}
      ></input>
      <p></p>
    </div>
  );
}

export default Registration;
