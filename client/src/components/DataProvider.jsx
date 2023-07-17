import React from "react";
import { useEffect, createContext, useState } from "react";
import { getUser } from "../api/user";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(async () => {
    setAuth(await getUser().username);
  }, []);

  const updateData = async () => {
    setAuth(await getUser().username);
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

export { DataProvider, DataContext };
