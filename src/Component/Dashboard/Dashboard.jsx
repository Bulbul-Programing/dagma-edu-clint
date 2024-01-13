import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    
    return (
        <div className="flex">
            <div className=" h-svh px-5 space-y-5 pt-5 bg-blue-100 w-[200px] md:w-3/12 lg:w-2/12">
                <div>
                    <img className="w-[80px] mx-auto h-[80px] rounded-full" src={user.photoURL} alt="" />
                    <p className="text-center my-2 font-bold">{user.displayName}</p>
                </div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/dashboard/home' className='w-full text-center py-2'>Admin Home</NavLink>
                    <NavLink to='/dashboard/teachers' className='w-ful text-center py-2'>Teachers</NavLink>
                    <NavLink to='/dashboard/memory' className='w-ful text-center py-2'>Memory</NavLink>
                    <NavLink to='/dashboard/notice' className='w-full text-center py-2'>Notice</NavLink>
                </div>
                <div className="divider"></div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/' className='w-full text-center py-2'>Home</NavLink>
                </div>
            </div>

            <div className="overflow-auto w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;