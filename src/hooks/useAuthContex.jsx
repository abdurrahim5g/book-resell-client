import { useContext } from "react";
import { AuthContex } from "../contex/AuthContex";

const useAuthContex = () => useContext(AuthContex);

export default useAuthContex;
