import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import styles from "../styles/pages/ContributePage.module.css";

function ImageUploader() {
  const [image, setImage] = useState("");
  const [databases, setDatabases] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDatabaseName, setSelectedDatabaseName] = useState("");

  const handleImageChange = (event) => {
    let file = event.target.files[0];
    if (file === undefined) {
      alert("Please upload a file");
      setImage();
      return;
    }
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64String = fileReader.result.toString("base64");
      setImage(base64String);
    };
  };

  const handleSubmit = () => {
    //add dependent on smart contract
  };

  useEffect(() => {
    //fetch databases from /api/database (chloe's endpoint)
    //then, take the value of that and use set databases to save it
  }, []);

  //for dropdown menu
  const [selected, setSelected] = useState("");

  return (
    <div className={styles.contribute}>
      <p className={styles.header}>Upload Images</p>
      <div>
        <DropdownMenu selected={selected} />
      </div>
      <p></p>
      <input
        type="file"
        name="image"
        className={styles.file}
        onChange={handleImageChange}
      ></input>
      <p></p>
      {image === "" ? null : <img className={styles.image} src={image} />}
      <p></p>
      <input
        type="button"
        value="Upload"
        className={styles.uploader}
        onClick={() => handleSubmit()}
      ></input>
    </div>
  );
}

export default ImageUploader;
