import React, { createContext, useState } from "react";

export const GlobalData = createContext("");

const ContextProvider = ({ children }) => {
  const [data, setData] = useState({});

  return (
    <GlobalData.Provider value={{ data, setData }}>
      {children}
    </GlobalData.Provider>
  );
};

export default ContextProvider;
