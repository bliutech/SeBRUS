import styles from "../styles/pages/HomePage.module.css";
import background from "../assets/SeBERUS.png";

function HomePage() {
  document.title = "Home | SeBRUS";

  return (
    <div className="page">
      <p style={{ textAlign: "center" }}>
        This is the future of crowdsourced AI datasets.
        <br />
        This is SeBRUS: <br />
        Secure Blockchain Regularization Upload System
      </p>
      <div className="home-image-container">
        <img
          alt="filler"
          width="350"
          height="350"
          style={{ imageAlign: "right", border: "50%" }}
          src={background}
        />
      </div>
    </div>
  );
}

export default HomePage;
