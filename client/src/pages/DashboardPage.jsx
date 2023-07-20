import { useState } from "react";
import { useCookies } from "react-cookie";

import styles from "../styles/pages/DashboardPage.module.css";

function DashboardPage() {
  document.title = "Dashboard | SeBRUS";
  const [cookies, setCookie, removeCookie] = useCookies("");
  const [auth, setAuth] = useState(false);

  return <div className="page"></div>;
}

export default DashboardPage;
