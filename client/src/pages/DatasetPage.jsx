import { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../styles/pages/DatasetPage.module.css";

function DatasetPage() {
  document.title = "Datasets";
  const [cookies, setCookie, removeCookie] = useCookies("");
  const [auth, setAuth] = useState(false);

  return <div className={styles.data}></div>;
}

export default DatasetPage;
