/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DBContex = createContext();

const DashboardContex = ({ children }) => {
  /**
   * States
   */
  const [dbTitle, setDBTitle] = useState("Dashboard");

  const dbInfo = {
    dbTitle,
    setDBTitle,
  };

  return <DBContex.Provider value={dbInfo}>{children}</DBContex.Provider>;
};

export default DashboardContex;
