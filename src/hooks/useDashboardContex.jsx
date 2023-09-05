import { useContext } from "react";
import { DBContex } from "../contex/DashboardContex";

const useDashboardContex = () => useContext(DBContex);

export default useDashboardContex;
