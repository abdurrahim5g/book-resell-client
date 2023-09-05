import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import AuthContexProvider from "./contex/AuthContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContexProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer theme="colored" position="bottom-right" />
    </AuthContexProvider>
  );
}

export default App;
