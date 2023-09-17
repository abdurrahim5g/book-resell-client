/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useDashboardContex from "../../hooks/useDashboardContex";

import Welcome from "../Welcome/Welcome";

const AdminDashboard = () => {
  const { setDBTitle } = useDashboardContex();
  useEffect(() => setDBTitle("Dashboard"), []);

  return (
    <>
      <Welcome />
    </>
  );
};

export default AdminDashboard;
