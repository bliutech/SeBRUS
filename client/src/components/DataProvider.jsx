import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getSession, deleteSession } from "../api/session";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [token, setToken, deleteToken] = useCookies(["session"]);
  const [auth, setAuth] = useState(false);

  const isLoggedIn = async () => {
    let { tokenString } = await getSession("me");
    if (tokenString === null) {
      alert("User is not logged in!");
      deleteSession();
      return false;
    }
    setToken(tokenString);
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      let authenticated = await isLoggedIn();
      setAuth(authenticated);
    };

    if (token.session === null) {
      fetchData().catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const updateData = async () => {
    let authenticated = await isLoggedIn();
    setAuth(authenticated);
  };

  const deleteData = async () => {
    let { id } = getSession("me");
    await deleteSession(id);
    deleteToken();
  };

  return (
    <DataContext.Provider
      value={{
        auth,
        updateData,
        deleteData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
