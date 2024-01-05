import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className="">
            <div className=" px-5 space-y-5 pt-5 bg-blue-100 w-2/12">
                <div>
                    <img className="w-[80px] mx-auto h-[80px] rounded-full" src={user.photoURL} alt="" />
                    <p className="text-center my-2 font-bold">{user.displayName}</p>
                </div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/dashboard' className='w-full text-center py-2'>Home</NavLink>
                    <NavLink to='/dashboard' className='w-full text-center py-2'>Home</NavLink>
                    <NavLink to='/dashboard' className='w-full text-center py-2'>Home</NavLink>
                    <NavLink to='/dashboard' className='w-full text-center py-2'>Home</NavLink>
                </div>
            </div>

            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;