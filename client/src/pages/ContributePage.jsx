import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import styles from "../styles/pages/ContributePage.module.css";
import { DataContext } from "../components/DataProvider";
import web3, { TruffleContract } from "web3";

function ImageUploader() {
  document.title = "Contribute | SeBRUS";

  const [image, setImage] = useState("");
  // const [databases, setDatabases] = useState([]);
  const { accounts } = useContext(DataContext);

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
    if (image === "") {
      alert("Please upload an image");
      return;
    }
    if (accounts.length === 0) {
      alert("Please connect your MetaMask account!");
      return;
    }

    // temporary values for testing
    let abi = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            indexed: false,
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "DatasetCreated",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "datasets",
        outputs: [
          {
            internalType: "contract Dataset",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
        ],
        name: "create",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    let address = "0x68e9a7519f508F78CB5D885a23F62694B447eC8E";
    window.web3 = new web3(window.ethereum);
    let DatasetContract = new window.web3.eth.Contract(abi, address);
    console.log(DatasetContract);

    DatasetContract.methods
      .create("test", "test")
      .send({ from: accounts[0] })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        console.log(error);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber);
        console.log(receipt);
      });
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
        accept="image/png, image/jpeg"
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
