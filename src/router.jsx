import {
    createBrowserRouter,
  } from "react-router-dom";
import MainRoute from "./MainRoute";
import Home from "./Page/Home/Home/Home";
import OurAcademy from "./Page/OurAcademy/OurAcademy/OurAcademy";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import EmailVerify from "./Component/EmailVerify/EmailVerify";
import ChangePassword from "./Component/ChangePassword/ChangePassword";
import MemoryDetails from "./Component/MemoryDetails/MemoryDetails";
import Dashboard from "./Component/Dashboard/Dashboard";

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
        },
        {
          path: '/showMemoryDetails/:id',
          element: <MemoryDetails></MemoryDetails>
        },
        {
          path : '/dashboard',
          element: <Dashboard></Dashboard>
          
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
    },
    {
      path:'/emailVerify',
      element: <EmailVerify></EmailVerify>
    },
    {
      path : '/changePassword',
      element: <ChangePassword></ChangePassword>
    }
  ]);

  export default router