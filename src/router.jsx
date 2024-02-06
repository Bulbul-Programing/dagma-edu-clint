import {
  createBrowserRouter, useParams,
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
import UpdateNotice from "./Page/Dashboard/UpdateNotice/UpdateNotice";
import Forum from "./Page/Forum/Forum";
import IsAdmin from "./Hooks/isAdmin";
import IsLogin from "./Hooks/isLogin";
import MujibCorner from "./Page/MujibCorner/MujibCorner";

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
      {
        path: '/forum',
        element:<IsLogin><Forum></Forum></IsLogin> 
      },
      {
        path : '/mujibCorner',
        element : <MujibCorner></MujibCorner>
      }
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
        element: <IsAdmin><DashboardHome></DashboardHome></IsAdmin>
      },
      {
        path: '/dashboard/teachers',
        element: <IsAdmin><AllTeachers></AllTeachers></IsAdmin>
      },
      {
        path: '/dashboard/memory',
        element:<IsAdmin><Memory></Memory></IsAdmin>
      },
      {
        path: '/dashboard/notice',
        element: <IsAdmin><AllNotice></AllNotice></IsAdmin>
      },
      {
        path: '/dashboard/update/teacher/:id',
        element: <IsAdmin><UpdateTeacher></UpdateTeacher></IsAdmin>,
        loader: ({ params }) => fetch(`http://localhost:5000/teacher/${params.id}`)
      },
      {
        path: '/dashboard/update/notice/:id',
        element: <IsAdmin><UpdateNotice></UpdateNotice></IsAdmin>,
        loader: ({ params }) => fetch(`http://localhost:5000/singleNotice/${params.id}`)
      },
    ]
  },
]);

export default router