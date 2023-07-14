import "../styles/index.css";
import styles from "../styles/components/LoginForm.module.css";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { getUser } from "../api/user";

function Login() {
  document.title = "Login";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies("");

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
      <span>
        <p>Username:</p>{" "}
        <input
          className={styles.Input}
          placeholder="Your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </span>
      <span>
        <p>Password:</p>{" "}
        <input
          className={styles.Input}
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </span>
      <p></p>
      <input
        className={styles.but}
        type="button"
        value="Login"
        onClick={() => handleEnter()}
      ></input>
    </div>
  );
}

export default Login;
