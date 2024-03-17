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
import IsAdmin from "./Hooks/IsAdmin";
import IsLogin from "./Hooks/isLogin";
import MujibCorner from "./Page/MujibCorner/MujibCorner";
import Corner from "./Page/Dashboard/Corner/Corner";
import AddResult from "./Page/Dashboard/AddResult/AddResult";
import UpdateResult from "./Page/Dashboard/UpdateResult/UpdateResult";
import TeacherDBHome from "./Page/Dashboard/TeacherDashbord/TeacherDBHome/TeacherDBHome";
import TeacherDashboard from "./Page/Dashboard/TeacherDashbord/TeacherDashboard";
import IsTeacher from "./Hooks/IsTeacher";
import IsAdminOrTeacher from "./Hooks/IsAdminOrTeacher";

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
        element: <IsLogin><Forum></Forum></IsLogin>
      },
      {
        path: '/mujibCorner',
        element: <MujibCorner></MujibCorner>
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
        element: <IsAdmin><Memory></Memory></IsAdmin>
      },
      {
        path: '/dashboard/notice',
        element: <IsAdmin><AllNotice></AllNotice></IsAdmin>
      },
      {
        path: '/dashboard/corner',
        element: <IsAdmin><Corner></Corner></IsAdmin>
      },
      {
        path: '/dashboard/result',
        element: <IsAdmin><AddResult></AddResult></IsAdmin>
      },
      {
        path: '/dashboard/update/teacher/:id',
        element: <IsAdminOrTeacher><UpdateTeacher></UpdateTeacher></IsAdminOrTeacher>,
        loader: ({ params }) => fetch(`http://localhost:5000/teacher/${params.id}`)
      },
      {
        path: '/dashboard/update/notice/:id',
        element: <IsAdminOrTeacher><UpdateNotice></UpdateNotice></IsAdminOrTeacher>,
        loader: ({ params }) => fetch(`http://localhost:5000/singleNotice/${params.id}`)
      },
      {
        path: '/dashboard/update/result/:id',
        element: <IsAdminOrTeacher><UpdateResult></UpdateResult></IsAdminOrTeacher>,
        loader: ({ params }) => fetch(`http://localhost:5000/single/result/${params.id}`)
      },
    ]
  },
  {
    path: 'teacherDB',
    element: <TeacherDashboard></TeacherDashboard>,
    children: [
      {
        path: '/teacherDB/home',
        element: <IsTeacher><TeacherDBHome></TeacherDBHome></IsTeacher>
      },
      {
        path: '/teacherDB/allTeacher',
        element:<IsTeacher><AllTeachers teacherRole='teacher'></AllTeachers></IsTeacher>
      },
      {
        path: '/teacherDB/memory',
        element: <IsTeacher><Memory></Memory></IsTeacher>
      },
      {
        path: '/teacherDB/notice',
        element:<IsTeacher><AllNotice></AllNotice></IsTeacher> 
      },
      {
        path: '/teacherDB/result',
        element: <IsTeacher><AddResult></AddResult></IsTeacher>
      },
    ]
  }
]);

export default router