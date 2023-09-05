import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import DBLayout from "../layouts/DBLayout";
import AdminDashboard from "../dashboard/AdminDashboard/AdminDashboard";
import DashboardContex from "../contex/DashboardContex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardContex>
        <DBLayout />
      </DashboardContex>
    ),
    children: [
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

export default router;
