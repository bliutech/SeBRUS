import { useState } from "react";
import { useCookies } from "react-cookie";

function DatasetPage() {
  document.title = "Datasets";
  const [cookies, setCookie, removeCookie] = useCookies("");
  const [auth, setAuth] = useState(false);

  return <p></p>;
}

export default DatasetPage;
