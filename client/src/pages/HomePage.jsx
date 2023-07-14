import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
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
          width="300"
          height="200"
          src="https://media.istockphoto.com/id/953499010/photo/blockchain-technology-structure-defocused.jpg?s=1024x1024&w=is&k=20&c=5x3Mmp9kIsHraabTUGK9Lbm9fJZ0PkbqW0WE_oYTF64="
        />
      </div>
    </div>
  );
}

export default HomePage;
