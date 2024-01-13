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
import DashboardHome from "./Page/Dashboard/DashboardHome/DashboardHome";
import Notice from "./Page/Home/Notice/Notice";
import AllTeachers from "./Page/Dashboard/AllTeachers/AllTeachers";
import AllNotice from "./Page/Dashboard/AllNotice/AllNotice";
import UpdateTeacher from "./Page/Dashboard/UpdateTeacher/UpdateTeacher";
import Memory from "./Page/Dashboard/Memory/Memory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute></MainRoute>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/academy',
        element: <OurAcademy></OurAcademy>
      },
      {
        path: '/showMemoryDetails/:id',
        element: <MemoryDetails></MemoryDetails>
      },
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/emailVerify',
    element: <EmailVerify></EmailVerify>
  },
  {
    path: '/changePassword',
    element: <ChangePassword></ChangePassword>
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/home',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: '/dashboard/teachers',
        element: <AllTeachers></AllTeachers>
      },
      {
        path: '/dashboard/memory',
        element: <Memory></Memory>
      },
      {
        path: '/dashboard/notice',
        element: <AllNotice></AllNotice>
      },
      {
        path: '/dashboard/update/teacher/:id',
        element: <UpdateTeacher></UpdateTeacher>,
      },
    ]
  },
]);

export default router