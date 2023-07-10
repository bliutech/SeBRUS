import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

function HomePage() {
  document.title = "GSET23BSG";

  return (
    <div>
      <p>Hello, this is our project on Blockchain for the Social Good</p>

      <div className="home-image-container">
        <img
          width="300"
          height="200"
          src="https://media.istockphoto.com/id/953499010/photo/blockchain-technology-structure-defocused.jpg?s=1024x1024&w=is&k=20&c=5x3Mmp9kIsHraabTUGK9Lbm9fJZ0PkbqW0WE_oYTF64="
        />
      </div>
      <a href="/signup">Sign up here!</a>
      <p></p>
      <a href="/signin">Login</a>

      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p></p>
        By Anusha, Beck, Chloe, Cy, and Trisha.
      </p>
    </div>
  );
}

export default HomePage;
