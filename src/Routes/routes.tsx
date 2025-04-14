import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../layouts/homelayout";
import Home from "../pages/Home";

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
]);
