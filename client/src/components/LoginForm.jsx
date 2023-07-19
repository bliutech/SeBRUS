import "../styles/index.css";
import styles from "../styles/components/LoginForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./DataProvider";
import { createSession } from "../api/session";

function Login() {
  document.title = "Login | SeBRUS";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showP, showPassword] = useState(false);
  const { updateData, setCookie } = useContext(DataContext);

  async function handleLogin() {
    if (username === "" || password === "") {
      alert("you have not entered one of the fields");
      return;
    }
    let session = await createSession(username, password);
    if (session === null) {
      alert("incorrect username or password");
      return;
    }
    setCookie("session", session);
    updateData();
    alert("logged in");
    navigate("/dashboard");
  }

  const handleToggle = () => {
    showPassword((current) => !current);
  };

  return (
    <div className={styles.rounded}>
      <span>
        <p className={styles.header}>Log in to your account:</p>{" "}
        <input
          className={styles.Input}
          placeholder="Your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </span>
      <span>
        <input
          className={styles.Input}
          id={styles.form}
          type={showP ? "text" : "password"}
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <br></br>
        <input
          type="checkbox"
          id={styles.check}
          placeholder="Show Password"
          onClick={() => handleToggle()}
        ></input>
        <span id={styles.regis}> Show password</span>
      </span>
      <p></p>
      <input
        className={styles.but}
        type="button"
        value="Login"
        onClick={() => handleLogin()}
      ></input>

      <p></p>
      <span className={styles.regis1}>Don't have an account? </span>
      <a className={styles.regis1} id={styles.regis2} href="/registration">
        Register here.
      </a>
    </div>
  );
}

export default Login;
