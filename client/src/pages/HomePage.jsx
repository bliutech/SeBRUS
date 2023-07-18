import styles from "../styles/pages/HomePage.module.css";

function HomePage() {
  document.title = "GSET23BSG";

  return (
    <div>
      <text className={styles.logo}>BlockData</text>
      <br></br>
      <br></br>
      <div className="home-image-container">
        <img
          alt="SeBRUHS logo"
          width="300"
          height="200"
          src={require("../assets/logov1.png")}
        />
      </div>
    </div>
  );
}

export default HomePage;
