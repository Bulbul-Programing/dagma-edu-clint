import {
    createBrowserRouter,
  } from "react-router-dom";
import MainRoute from "./MainRoute";
import Home from "./Page/Home/Home/Home";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainRoute></MainRoute>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        }
      ]
    },
  ]);

  export default router