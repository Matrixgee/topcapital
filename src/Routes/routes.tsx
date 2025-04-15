import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../layouts/homelayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/Authlay";
import Login from "../Auth/login";
import Register from "../Auth/register";
import AboutUs from "../pages/Aboutus";
import ContactUs from "../pages/contact";
import Userlayer from "../layouts/userlayer";
import Overview from "../clients/overview";
import Deposit from "../clients/deposit";
import Withdraw from "../clients/withdraw";

export const Routes = createBrowserRouter([
  {
    path: "",
    element: <Homelayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
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

  {
    path: "user",
    element: <Userlayer />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
    ],
  },
]);
