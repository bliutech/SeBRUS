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

  function showPassword() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div
      className={styles.rounded}
      style={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    >
      <span>
        <p className={styles.header}>Register for an account:</p>{" "}
        <input
          className={styles.Input}
          placeholder="Enter a unique username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </span>
      <span>
        <input
          type="password"
          id="pass"
          className={styles.Input}
          placeholder="Enter a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <br></br>
        <input
          type="checkbox"
          id={styles.check}
          placeholder="Show Password"
          onClick={() => showPassword()}
        ></input>
        <text id={styles.regis}> Show password?</text>
      </span>
      <p></p>
      <input
        className={styles.but}
        type="button"
        value="Register"
        onClick={() => handleEnter()}
      ></input>
    </div>
  );
}

export default Registration;
