import useAuthContex from "../../hooks/useAuthContex";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";

const Dashboard = () => {
  const { userRole } = useAuthContex();
  console.log(userRole);
  return (
    <>
      {userRole === "admin" && <AdminDashboard />}
      {userRole === "seller" && <SellerDashboard />}
      {userRole === "buyer" && <BuyerDashboard />}
    </>
  );
};

export default Dashboard;
