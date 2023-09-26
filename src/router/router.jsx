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
import AdminRoute from "./AdminRoute";
import Catagory from "../dashboard/AdminDashboard/Catagory/Catagory";
import Products from "../dashboard/SellerDashboard/Products/Products";
import CatagoryPage from "../pages/Catagory/CatagoryPage";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/catagory/:slug",
        element: <CatagoryPage />,
        loader: ({ params }) =>
          axios(`http://localhost:5000/product?catagory=${params.slug}`),
      },
    ],
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
        element: (
          <AdminRoute>
            <Sellers />
          </AdminRoute>
        ),
      },
      {
        path: "buyers",
        element: (
          <AdminRoute>
            <Buyers />
          </AdminRoute>
        ),
      },
      {
        path: "catagory",
        element: (
          <AdminRoute>
            <Catagory />
          </AdminRoute>
        ),
      },
      {
        path: "products",
        element: (
          <>
            <Products />
          </>
        ),
      },
    ],
  },
]);

export default router;
