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

      let datasetManager = await getDataset("0");
      console.log(datasetManager);
      let address = datasetManager[0].address;
      console.log(address);

      let datasetABI = await getABI("1");

      if (abi === null || datasetManager === null || datasetABI === null) {
        alert("Error loading dataset manager or dataset ABI.");
        return;
      }

      window.web3 = new web3(window.ethereum);
      let DatasetManagerContract = new window.web3.eth.Contract(abi, address);

      let datasetCount = await DatasetManagerContract.methods
        .datasetCount()
        .call();

      console.log(datasetCount);

      let datasetsTemp = [];

      for (let i = 0; i < datasetCount; i++) {
        let dataset = await DatasetManagerContract.methods.datasets(i).call();

        console.log(dataset);

        let images = [];

        let DatasetContract = new window.web3.eth.Contract(datasetABI, dataset);

        // await DatasetContract.methods.createData("test", "test").send({from: window.ethereum.selectedAddress, gas: 1000000});

        let imageCount = await DatasetContract.methods.imageCount().call();

        for (let j = 0; j < imageCount; j++) {
          let image = await DatasetContract.methods.images(j).call();
          images.push(image);
        }
        console.log(images);

        datasetsTemp.push({
          name: await DatasetContract.methods.name().call(),
          description: await DatasetContract.methods.description().call(),
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
      <ul>
        {datasets.map((dataset) => {
          console.log(dataset);
          return (
            <li>
              <p>{dataset.name}</p>
              <p>{dataset.description}</p>
              <p>Images:</p>
              <ul>
                {dataset.images.map((image) => {
                  return (
                    <li>
                      <p>{image.value}</p>
                      <p>{image.class}</p>
                      <p>{image.approved ? "Approved" : "Not Approved"}</p>
                      <p>
                        <Link to="/dataset?id=1">Link</Link>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DashboardPage;
