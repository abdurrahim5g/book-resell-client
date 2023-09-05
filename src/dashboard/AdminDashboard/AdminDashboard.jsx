import useDashboardContex from "../../hooks/useDashboardContex";

const AdminDashboard = () => {
  const { dbTitle } = useDashboardContex();

  return (
    <div className="AdminDashboard">
      <h3>{dbTitle}</h3>
    </div>
  );
};

export default AdminDashboard;
