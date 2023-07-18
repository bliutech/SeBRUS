import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { getUser } from "../api/user";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [session, setSession, deleteSession] = useCookies(["session"]);
  const [auth, setAuth] = useState(false);

  // useEffect(async () => {
  //   setAuth(await getUser());
  // }, []);

  const updateData = async () => {
    setAuth(await getUser());
  };

  return (
    <div>
      <DataContext.Provider
        value={{
          auth,
          setAuth,
          updateData,
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};

export { DataProvider, DataContext };
