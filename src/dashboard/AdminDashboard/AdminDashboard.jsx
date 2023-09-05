/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useDashboardContex from "../../hooks/useDashboardContex";

const AdminDashboard = () => {
  const { dbTitle, setDBTitle } = useDashboardContex();
  useEffect(() => setDBTitle("Dashboard"), []);

  return (
    <div className="AdminDashboard">
      <h3>{dbTitle}</h3>
    </div>
  );
};

export default AdminDashboard;
