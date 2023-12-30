import {
    createBrowserRouter,
  } from "react-router-dom";
import MainRoute from "./MainRoute";
import Home from "./Page/Home/Home/Home";
import OurAcademy from "./Page/OurAcademy/OurAcademy/OurAcademy";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainRoute></MainRoute>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/academy',
          element : <OurAcademy></OurAcademy>
        }
      ]
    },
    {
      path:'/login',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    }
  ]);

  export default router