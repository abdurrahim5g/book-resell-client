import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import AuthContexProvider from "./contex/AuthContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-awesome-slider/dist/styles.css";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContexProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
      <ToastContainer theme="colored" position="bottom-right" />
    </AuthContexProvider>
  );
}

export default App;
