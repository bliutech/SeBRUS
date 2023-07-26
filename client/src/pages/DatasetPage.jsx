import { useEffect, useState } from "react";
import web3 from "web3";

// import { Grid } from "react-visual-grid";

import { Image } from "../components/Image";
import { getABI } from "../api/abi";
import { getDataset } from "../api/dataset";

import { DataContext } from "../components/DataProvider";

import styles from "../styles/pages/DatasetPage.module.css";

import dog from "../assets/dog1.png";

function DatasetPage() {
  document.title = "Datasets | SeBRUS";

  const [id, setId] = useState(null);

  const [dataImages, setDataImages] = useState([]);

  const verifyImage = (index) => {
    const load = async () => {
      let datasetABI = await getABI("1");
      let imageABI = await getABI("2");

      if (datasetABI === null || imageABI === null) {
        alert("Error loading dataset manager or dataset ABI.");
        return;
      }

      window.web3 = new web3(window.ethereum);

      const urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get("id");
      setId(id);

      if (id === null) {
        alert("ID not found.");
        return;
      }

      let dataset = await getDataset(id);
      if (dataset === null) {
        alert("Dataset not found.");
        return;
      }

      console.log(dataset);

      let DatasetContract = new window.web3.eth.Contract(
        datasetABI,
        dataset[0].address,
      );

      let image = await DatasetContract.methods.getImage(index);
      let address = await image.call();
      let ImageContract = new window.web3.eth.Contract(imageABI, address);
      await ImageContract.methods
        .approve()
        .send({ from: window.ethereum.selectedAddress });

      let images = [];
      let imageCount = await DatasetContract.methods.getImageCount().call();

      for (let j = 0; j < imageCount; j++) {
        let imageAddress = await DatasetContract.methods.getImage(j).call();

        let ImageContract = await new window.web3.eth.Contract(
          imageABI,
          imageAddress,
        );

        let image = {
          class: await ImageContract.methods.getClass().call(),
          value: await ImageContract.methods.getValue().call(),
          approved: await ImageContract.methods.getApproved().call(),
        };

        images.push(image);
      }
      setDataImages(images);

      alert("Image approved.");
    };

    load();
  };

  useEffect(() => {
    const load = async () => {
      let datasetABI = await getABI("1");
      let imageABI = await getABI("2");

      if (datasetABI === null || imageABI === null) {
        alert("Error loading dataset manager or dataset ABI.");
        return;
      }

      window.web3 = new web3(window.ethereum);

      const urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get("id");
      setId(id);

      if (id === null) {
        alert("ID not found.");
        return;
      }

      let dataset = await getDataset(id);
      if (dataset === null) {
        alert("Dataset not found.");
        return;
      }

      console.log(dataset);

      let images = [];

      let DatasetContract = new window.web3.eth.Contract(
        datasetABI,
        dataset[0].address,
      );

      let imageCount = await DatasetContract.methods.getImageCount().call();

      for (let j = 0; j < imageCount; j++) {
        let imageAddress = await DatasetContract.methods.getImage(j).call();

        let ImageContract = await new window.web3.eth.Contract(
          imageABI,
          imageAddress,
        );

        let image = {
          class: await ImageContract.methods.getClass().call(),
          value: await ImageContract.methods.getValue().call(),
          approved: await ImageContract.methods.getApproved().call(),
        };

        images.push(image);
      }
      setDataImages(images);
    };

    load();
  }, []);

  if (id === null) {
    return (
      <div className="page">
        <h1>Dataset Not found</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <div className={styles.data}>
        <ul>
          {dataImages.map((image, index) => (
            <li key={index}>
              <p>{image.class}</p>
              <img src={image.value} alt={image.class + index} />
              <button onClick={() => verifyImage(index)}>
                {image.approved ? "Approved" : "Not approved"}
              </button>
            </li>
          ))}
        </ul>

        <Image></Image>
        {/* {data && data.length>0 && data.map((item)=><p>{item.about}</p>)} */}
        {"ID:" + id}
      </div>
    </div>
  );
}

export default DatasetPage;
