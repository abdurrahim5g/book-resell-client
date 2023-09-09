import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import DBLayout from "../layouts/DBLayout";
import DashboardContex from "../contex/DashboardContex";
import Sellers from "../dashboard/AdminDashboard/Sellers/Sellers";
import Buyers from "../dashboard/AdminDashboard/Buyers/Buyers";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import DashboardRoute from "./DashboardRoute";
import Dashboard from "../dashboard/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/", element: <Home /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: (
      <DashboardRoute>
        <DashboardContex>
          <DBLayout />
        </DashboardContex>
      </DashboardRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "sellers",
        element: <Sellers />,
      },
      {
        path: "buyers",
        element: <Buyers />,
      },
    ],
  },
]);

export default router;
