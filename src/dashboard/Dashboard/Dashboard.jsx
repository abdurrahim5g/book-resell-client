import useAuthContex from "../../hooks/useAuthContex";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const { userRole } = useAuthContex();
  return <>{userRole && "admin" && <AdminDashboard />}</>;
};

export default Dashboard;
