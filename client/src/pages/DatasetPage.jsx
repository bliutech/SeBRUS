import { useEffect, useState } from "react";
// import { Grid } from "react-visual-grid";

import { Image } from "../components/Image";

import styles from "../styles/pages/DatasetPage.module.css";

import dog from "../assets/dog1.png";

function DatasetPage() {
  document.title = "Dataset | SeBRUS";

  const [id, setId] = useState(null);

  const [images, setImage] = useState([
    { text: "../assets/dog1.png" },
    { text: "../assets/dog2.png" },
    { text: "../assets/dog3.png" },
  ]);
  //code the img retrieval
  // add key

  const addList = () => {
    const newImage = { id: Math.random(), text: "New todo" };
    setImage([images, newImage]);
  };

  console.log(id);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    setId(id);
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
          {images.map((images, index) => (
            <li key={index}>{images.text}</li>
          ))}
        </ul>
        {/* <Grid
        images={images}
        width={900}
        height={1200}
        gridLayout="vertical"
        theme={{
          backgroundColor: "#000",
          controlBgColor: "#303030",
          controlBtnColor: "#595959",
          controlsBackDropColor: "rgba(0, 0, 0, 0.95)",
          thumbnailBgColor: "#202020",
        }}
      />; */}
        <img height={300} width={300} src={dog} alt={"test img"} />
        <Image></Image>
        {/* {data && data.length>0 && data.map((item)=><p>{item.about}</p>)} */}
      </div>
    </div>
  );
}

export default DatasetPage;
