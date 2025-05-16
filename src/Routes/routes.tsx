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
import Packages from "../clients/packages";
import Plans from "../clients/plans";
import Adminlayout from "../layouts/adminlayout";
import Allusers from "../Admin/allusers";
import AllTransactions from "../Admin/alltransactions";
import History from "../clients/history";
import UserDetails from "../Admin/userdetails";

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
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "admin",
    element: <Adminlayout />,
    children: [
      {
        path: "allusers",
        element: <Allusers />,
      },
      {
        path: "alltransactions",
        element: <AllTransactions />,
      },
      {
        path: "userdetails/:_id",
        element: <UserDetails />,
      },
    ],
  },
]);
