import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "web3";

import { getABI } from "../api/abi";
import { getDataset, createDataset } from "../api/dataset";

import { DataContext } from "../components/DataProvider";

import styles from "../styles/pages/CreateDatasetPage.module.css";

function CreateDatasetPage() {
  document.title = "Create a Dataset | SeBRUS";

  const navigate = useNavigate();

  const { accounts } = useContext(DataContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = async () => {
    if (name === "" || description === "") {
      alert("Please fill out all fields.");
      return;
    }

    let abi = await getABI("0");

    console.log(abi);

    let datasetManager = await getDataset("0");

    console.log(datasetManager);

    let address = datasetManager[0].address;

    console.log(address);

    if (abi === null || datasetManager === null || address === null) {
      alert("Error loading dataset manager or dataset ABI.");
      return;
    }

    window.web3 = new web3(window.ethereum);
    let DatasetManagerContract = new window.web3.eth.Contract(abi, address);
    DatasetManagerContract.setProvider(window.ethereum);

    await DatasetManagerContract.methods
      .createDataset(name, description)
      .send({ from: window.ethereum.selectedAddress });

    let datasetCount = await DatasetManagerContract.methods
      .getDatasetCount()
      .call();

    console.log(datasetCount);

    let index = Number(datasetCount) - 1;

    console.log(typeof index);

    let newAddress = await DatasetManagerContract.methods
      .getDataset(index)
      .call();

    console.log(newAddress);

    let data = await createDataset(name, description, newAddress, 1);

    if (data === null) {
      alert("Error creating dataset.");
      return;
    }

    alert("Dataset created successfully.");
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className={styles.create}>
        <p className={styles.header}>Create Dataset</p>
        <input
          className={styles.box}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.box}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className={styles.button} onClick={() => handleClick()}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateDatasetPage;
