import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../components/DataProvider";
import { getSession } from "../api/session";
import { getUser, updateUser, deleteUser } from "../api/user";

import styles from "../styles/pages/ProfilePage.module.css";
import profile from "../assets/profile.jpg";

function ProfilePage() {
  document.title = "Profile | SeBRUS";

  const { deleteData } = useContext(DataContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showP, showPassword] = useState(false);

  const navigate = useNavigate();

  async function handleUpdate() {
    if (username === "" || password === "") {
      alert("You cannot have empty fields.");
      return;
    }
    let sessionObj = await getSession("me");
    let userObject = await updateUser(sessionObj.user_id, username, password);
    if (userObject === null) {
      alert("You must change your username or password.");
      return;
    }
    setUsername(userObject.username);
    setPassword(userObject.password);
    alert("Profile updated.");
  }

  async function handleDelete() {
    let confirm = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (!confirm) {
      return;
    }
    let sessionObj = await getSession("me");
    let deleted = await deleteUser(sessionObj.user_id);
    if (!deleted) {
      alert("Something went wrong.");
      return;
    }
    await deleteData();
    alert("Account deleted.");
    navigate("/");
  }

  const handleToggle = () => {
    showPassword((current) => !current);
  };

  useEffect(() => {
    const fetchData = async () => {
      let sessionObj = await getSession("me");
      let userObj = await getUser(sessionObj.user_id);
      setUsername(userObj.username);
      setPassword(userObj.password);
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="page">
      <div className={styles.profPage}>
        <img
          src={profile}
          alt="profile image"
          className={styles.profileImage}
        />
        <span>
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
        </span>
        <span className={styles.showPassword}>
          <input
            type="checkbox"
            id={styles.check}
            placeholder="Show Password"
            onClick={() => handleToggle()}
          ></input>
          <span id={styles.regis}> Show password</span>
        </span>
        <input
          className={styles.but}
          type="button"
          value="Update"
          onClick={() => handleUpdate()}
        ></input>
        <input
          className={styles.but}
          type="button"
          value="Delete"
          onClick={() => handleDelete()}
        ></input>
      </div>
    </div>
  );
}

export default ProfilePage;
