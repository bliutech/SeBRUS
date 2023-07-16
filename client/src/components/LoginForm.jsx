import "../styles/index.css";
import styles from "../styles/components/LoginForm.module.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { getUser } from "../api/user";
import { useContext } from "react";

function Login() {
  document.title = "Login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies("");
  const [showP, showPassword] = useState(false);

  function handleEnter(key) {
    if (key === "Enter") {
      handleLogin();
    }
  }

  async function handleLogin() {
    if (!username) {
      window.alert("This username is invalid");
      return;
    } else {
      const user = await getUser(username);
      if (user.password === password) {
        setCookie("name", username);
      } else {
        window.alert("wrong password");
      }
    }
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
        onClick={() => handleEnter()}
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
