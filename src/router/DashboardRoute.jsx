/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuthContex from "../hooks/useAuthContex";

const DashboardRoute = ({ children }) => {
  const { user, loading } = useAuthContex();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user?.uid) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return children;
};

export default DashboardRoute;
