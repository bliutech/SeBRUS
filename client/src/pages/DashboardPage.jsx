import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import web3 from "web3";

import { getABI } from "../api/abi";
import { getDataset } from "../api/dataset";

import { DataContext } from "../components/DataProvider";

import styles from "../styles/pages/DashboardPage.module.css";

function DashboardPage() {
  document.title = "Dashboard | SeBRUS";

  const [datasets, setDatasets] = useState([]);

  const { accounts } = useContext(DataContext);

  useEffect(() => {
    const load = async () => {
      let abi = await getABI("0");
      console.log("ABI:", abi);
      let datasetManager = await getDataset("0");
      console.log("DatasetManager:", datasetManager);
      let address = datasetManager[0].address;
      console.log("Address:", address);

      let datasetABI = await getABI("1");

      let imageABI = await getABI("2");

      if (
        abi === null ||
        datasetManager === null ||
        datasetABI === null ||
        imageABI === null
      ) {
        alert("Error loading dataset manager or dataset ABI.");
        return;
      }

      window.web3 = new web3(window.ethereum);
      let DatasetManagerContract = new window.web3.eth.Contract(abi, address);
      DatasetManagerContract.setProvider(window.ethereum);

      let datasetCount = await DatasetManagerContract.methods
        .getDatasetCount()
        .call();

      console.log(datasetCount);

      let datasetsTemp = [];

      for (let i = 0; i < datasetCount; i++) {
        let dataset = await DatasetManagerContract.methods.getDataset(i).call();

        console.log(dataset);

        let images = [];

        let DatasetContract = new window.web3.eth.Contract(datasetABI, dataset);

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

        datasetsTemp.push({
          name: await DatasetContract.methods.getName().call(),
          description: await DatasetContract.methods.getDescription().call(),
          images: images,
        });

        setDatasets(datasetsTemp);
      }
    };
    load();
  }, []);

  return (
    <div className="page">
      <h1>Datasets</h1>
      <ul className={styles.list}>
        {datasets.map((dataset, index) => {
          console.log(dataset);
          return (
            <li className={styles.datasets} key={dataset.name}>
              <p className={styles.name}>Dataset name: {dataset.name}</p>
              <p className={styles.description}>
                Description: {dataset.description}
              </p>
              <p>
                <Link to={"/datasets?id=" + (index + 1).toString()}>Link</Link>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DashboardPage;
