import React, { useEffect, useState } from "react";
import useCookie from "react-cookie";
import { getUser } from "../api/user";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [session, setSession, deleteSession] = useCookie(["session"]);
  const [auth, setAuth] = useState(false);

  const isLoggedIn = async () => {
    // if session valid
    // /api/session/me
    // if you are logged in, then it will give you a session cookie. Set auth = true; Set cookie.
    // if you are not logged in, then it will error. alert(1)
  };

  useEffect(async () => {
    let auth = await isLoggedIn();
    setAuth(auth);
  }, []);

  const updateData = async () => {
    let auth = await isLoggedIn();
    setAuth(auth);
  };

  return (
    <DataContext.Provider
      value={{
        auth,
        setAuth,
        updateData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
export { DataContext };
