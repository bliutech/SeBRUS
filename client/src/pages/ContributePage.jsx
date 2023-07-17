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
      <br></br>
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
      <input
        type="button"
        value="Upload"
        className={styles.uploader}
        onClick={() => handleSubmit()}
      ></input>
      {image === "" ? null : <img src={image} alt="Upload image" />}
    </div>
  );
}

export default ImageUploader;
