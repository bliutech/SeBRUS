import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../api/user";

import styles from "../styles/components/RegistrationForm.module.css";

function RegistrationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showP, showPassword] = useState(false);

  async function handleRegistration() {
    if (!username || username.length < 6) {
      window.alert("Your username must be 6+ characters long");
      return;
    }
    let user = await createUser(username, password);
    if (user === undefined) {
      alert("account already exists");
      return;
    }
    console.log(user);
    window.alert("Your account has been made! You may login now");
    navigate("/login");
    return;
  }

  const handleToggle = () => {
    showPassword((current) => !current);
  };

  return (
    <div className={styles.rounded}>
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
          type={showP ? "text" : "password"}
          id="pass"
          className={styles.Input}
          placeholder="Enter a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          type="checkbox"
          id={styles.check}
          placeholder="Show Password"
          onClick={() => handleToggle()}
        ></input>
        <text id={styles.regis}> Show password</text>
      </span>
      <input
        className={styles.but}
        type="button"
        value="Register"
        onClick={() => handleRegistration()}
      ></input>
      <span className={styles.regis1}>Already have an account? </span>
      <a className={styles.regis1} id={styles.regis2} href="/login">
        Login here.
      </a>
    </div>
  );
}

export default RegistrationForm;
