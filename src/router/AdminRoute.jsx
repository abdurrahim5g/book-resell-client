/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuthContex from "../hooks/useAuthContex";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
  const { userRole, loading, logOut } = useAuthContex();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "admin") {
      logOut()
        .then(() => {
          toast.error("Access Decline");
          navigate("/login");
          return;
        })
        .catch(console.dir);
    }
  }, []);

  if (loading) return <Loading />;

  if (userRole === "admin") return children;
};

export default AdminRoute;
