import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "web3";

import { getABI } from "../api/abi";
import { getDataset, createDataset } from "../api/dataset";

import { DataContext } from "../components/DataProvider";

function CreateDatasetPage() {
  document.title = "Create Dataset | SeBRUS";

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

    let datasetManager = await getDataset("0");

    let address = datasetManager[0].address;

    let datasetABI = await getABI("1");

    if (abi === null || datasetManager === null || datasetABI === null) {
      alert("Error loading dataset manager or dataset ABI.");
      return;
    }

    window.web3 = new web3(window.ethereum);
    let DatasetManagerContract = new window.web3.eth.Contract(abi, address);

    await DatasetManagerContract.methods
      .createDataset(name, description)
      .send({ from: accounts[0], gas: 2000000 });

    let datasetCount = await DatasetManagerContract.methods
      .datasetCount()
      .call();

    console.log(datasetCount);

    let index = Number(datasetCount) - 1;

    console.log(typeof index);

    let newAddress = await DatasetManagerContract.methods
      .datasets(index)
      .call();

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
      <h1>Create Dataset</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => handleClick()}>Create</button>
    </div>
  );
}

export default CreateDatasetPage;
