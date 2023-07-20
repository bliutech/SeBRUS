import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import web3 from "web3";

import DropdownMenu from "../components/DropdownMenu";
import { DataContext } from "../components/DataProvider";

import styles from "../styles/pages/ContributePage.module.css";

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
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "value",
            type: "string",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "DataCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "DataVerified",
        type: "event",
      },
      {
        inputs: [],
        name: "description",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [],
        name: "imageCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "images",
        outputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "value",
            type: "string",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
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
            name: "_content",
            type: "string",
          },
        ],
        name: "createData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_id",
            type: "uint256",
          },
        ],
        name: "approveData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    let address = "0x5eE69A9EB760313D955E72BE8f33c32cB4204Ad8";
    window.web3 = new web3(window.ethereum);
    let DatasetContract = new window.web3.eth.Contract(abi, address);
    DatasetContract.setProvider(window.ethereum);

    DatasetContract.methods
      .createData("test")
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

    DatasetContract.methods.imageCount
      .call()
      .call()
      .then((res) => {
        console.log("imageCount:", res);
      });
    async function getImage() {
      const images = await DatasetContract.methods.images(0).call();
      console.log("images:", images);
    }
    getImage();
  };

  useEffect(() => {
    //fetch databases from /api/database (chloe's endpoint)
    //then, take the value of that and use set databases to save it
  }, []);

  //for dropdown menu
  const [selected, setSelected] = useState("");

  return (
    <div className="page">
      <div className={styles.contribute}>
        <p className={styles.header}>Upload Images</p>
        <div>
          <DropdownMenu selected={selected} />
        </div>
        <p></p>
        <input
          type="file"
          accept="image/png,image/jpeg"
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
    </div>
  );
}

export default ImageUploader;
