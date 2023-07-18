import "../styles/index.css";
import styles from "../styles/components/LoginForm.module.css";
import { useState } from "react";
import { getUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./DataProvider";
import { createSession } from "../api/session";

function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showP, showPassword] = useState(false);
  const { updateData, setToken } = useContext(DataContext);

  async function handleLogin() {
    if (username === "" || password === "") {
      alert("you have not entered one of the fields");
      return;
    }
    let session = await createSession(username, password);
    setToken(session);
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
        <text id={styles.regis}> Show password</text>
      </span>
      <p></p>
      <input
        className={styles.but}
        type="button"
        value="Login"
        onClick={() => handleLogin()}
      ></input>

      <p></p>
      <text className={styles.regis1}>Don't have an account? </text>
      <a className={styles.regis1} id={styles.regis2} href="/registration">
        Register here.
      </a>
    </div>
  );
}

export default Login;
