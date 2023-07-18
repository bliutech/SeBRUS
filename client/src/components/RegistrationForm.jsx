import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import styles from "../styles/components/RegistrationForm.module.css";
import { createUser, getUser } from "../api/user";
import { useState } from "react";
import { useContext, UserContext } from "react";

function Registration() {
  document.title = "Register | SeBRUS";

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
        value="Register"
        onClick={() => handleRegistration()}
      ></input>
      <p></p>
      <span className={styles.regis1}>Already have an account? </span>
      <a className={styles.regis1} id={styles.regis2} href="/login">
        Login here.
      </a>
    </div>
  );
}

export default Registration;
