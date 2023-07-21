import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getSession, deleteSession } from "../api/session";
import web3 from "web3";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [cookie, setCookie, deleteCookie] = useCookies(["session"]);
  const [auth, setAuth] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const isLoggedIn = async () => {
    let sessionObj = await getSession("me");

    if (sessionObj === undefined) {
      alert("User is not logged in! tokenString");
      deleteCookie("session");
      return false;
    }
    setCookie("session", sessionObj.token);
    return true;
  };

  const updateData = async () => {
    let authenticated = await isLoggedIn();
    setAuth(authenticated);
  };

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new web3(window.ethereum);
        const accounts = await window.web3.eth.getAccounts();
        setAccounts(accounts);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Please install Metamask");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let authenticated = await isLoggedIn();
      setAuth(authenticated);
    };
    if (cookie.session !== undefined) {
      fetchData().catch((err) => {
        console.log(err);
      });
    }
  }, []);

  useEffect(() => {
    const fetchWallet = async () => {
      const currentAccounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccounts(currentAccounts);
    };
    if (window.ethereum) {
      fetchWallet().catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const deleteData = async () => {
    let sessionObj = await getSession("me");
    await deleteSession(sessionObj.id);
    deleteCookie("session");
    setAuth(false);
  };

  return (
    <DataContext.Provider
      value={{
        auth,
        updateData,
        deleteData,
        setCookie,
        accounts,
        connectWallet,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
