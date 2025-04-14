import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../layouts/homelayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/Authlay";
import Login from "../Auth/login";
import Register from "../Auth/register";

export const Routes = createBrowserRouter([
  {
    path: "",
    element: <Homelayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
