import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "web3";

import DropdownMenu from "../components/DropdownMenu";
import { DataContext } from "../components/DataProvider";

import { getABI } from "../api/abi";

import styles from "../styles/pages/ContributePage.module.css";
import { getDataset } from "../api/dataset";

function ImageUploader() {
  document.title = "Contribute | SeBRUS";

  const navigate = useNavigate();

  const { accounts } = useContext(DataContext);

  const [image, setImage] = useState("");

  const [selected, setSelected] = useState("");

  const [label, setLabel] = useState("");

  const fileReader = new FileReader();

  fileReader.onload = () => {
    const base64String = fileReader.result.toString("base64");
    setImage(base64String);
  };

  const handleImageChange = (event) => {
    let file = event.target.files[0];
    if (file === undefined) {
      alert("Please upload a file");
      return;
    }
    if (file.size > 1000000) {
      alert("File size must be less than 10MB");
      return;
    }
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert("File must be a PNG or JPEG image");
      return;
    }

    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (image === "") {
      alert("Please upload an image");
      return;
    }
    if (accounts.length === 0) {
      alert("Please connect your MetaMask account!");
      return;
    }

    if (selected === "") {
      alert("Please select a dataset");
      return;
    }

    if (label === "") {
      alert("Please enter a label");
      return;
    }

    let abi = await getABI("1");
    if (abi === null) {
      alert("Error loading dataset ABI.");
      return;
    }
    console.log(abi);
    console.log(selected);

    let address = selected;

    window.web3 = new web3(window.ethereum);
    let DatasetContract = new window.web3.eth.Contract(abi, address);

    console.log(image);
    console.log(label);

    await DatasetContract.methods
      .createData(image, label)
      .send({ from: window.ethereum.selectedAddress });

    alert("Image uploaded successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className={styles.contribute}>
        <p className={styles.header}>Upload Images</p>
        <div>
          <DropdownMenu selected={selected} setSelected={setSelected} />
        </div>
        <input
          type="file"
          accept="image/png,image/jpeg"
          name="image"
          className={styles.file}
          onChange={handleImageChange}
        />

        <input
          type="text"
          placeholder="Label"
          className={styles.label}
          onChange={(event) => setLabel(event.target.value)}
        />

        {image === "" ? null : (
          <img className={styles.image} src={image} alt="submitted data" />
        )}

        <button className={styles.uploader} onClick={() => handleSubmit()}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
