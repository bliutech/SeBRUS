import { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../styles/pages/DashboardPage.module.css";

function DashboardPage() {
  document.title = "Dashboard";
  const [cookies, setCookie, removeCookie] = useCookies("");
  const [auth, setAuth] = useState(false);

  return <div></div>;
}

export default DashboardPage;
