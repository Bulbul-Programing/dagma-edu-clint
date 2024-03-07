import { Link, NavLink } from "react-router-dom";
import './navbar.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
    const { user, loading, logOut, emailLogin } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [teacherInfo, setTeacherInfo] = useState({})
    
    useEffect(()=>{
        axiosSecure.get(`/getTeacher/role/${user?.email}`)
        .then(res=> setTeacherInfo(res.data))
    },[user])
    
    if (loading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    const navItem = <>
        <NavLink className='mr-2 font-bold py-2 px-3' to='/'>Home</NavLink>
        <NavLink className='mr-2 font-bold py-2 px-3' to='/academy'>Our Academy</NavLink>
        <NavLink className='mr-2 font-bold py-2 px-3' to='/forum'>Forum</NavLink>
        {
            teacherInfo?.teacherRole === 'Admin' && <NavLink className='mr-2 font-bold py-2 px-3' to='/dashboard/home'>Dashboard</NavLink>
        }
        {
            teacherInfo?.teacherRole === 'teacher' && <NavLink className='mr-2 font-bold py-2 px-3' to='/teacherDB/home'>Dashboard</NavLink>
        }
        <NavLink className='mr-2 font-bold py-2 px-3' to='/mujibCorner'>Mujib Corner</NavLink>
    </>


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Success",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    return (
        <div className="navbar px-5 bg-transparent shadow-xl">
            <div className="navbar-start">
                <div className="dropdown z-50">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <div className="block md:hidden lg:hidden">
                            {
                                user ? <div className="flex flex-col gap-y-3 lg:hidden items-center gap-x-3">
                                    <p className="font-bold">{user?.displayName}</p>
                                    <div>
                                        {
                                            user ? <img className="w-[50px] h-[50px] mb-3 rounded-full" src={user?.photoURL} alt="" /> : ''
                                        }
                                    </div>
                                </div> : ''
                            }
                        </div>
                        <ul className="flex flex-col" >
                            {navItem}
                        </ul>
                    </div>

                </div>
                <div className="flex items-center">
                    <img className="w-[70px] h-[70px]" src="https://i.ibb.co/QQrYXxB/35933-ai.png" alt="" />
                    <h1 className="text-4xl font-bold">DAGMA</h1>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="hidden md:block lg:block">
                    {user ?
                        <div className="flex items-center gap-x-3">
                            <p>{user?.displayName}</p>
                            <div>
                                {
                                    user ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} alt="" /> : ''
                                }
                            </div>
                        </div> : ''
                    }
                </div>
                <div className="ml-3 hidden md:block lg:block">
                    {
                        user ? <button onClick={handleLogOut} className="btn bg-blue-500 text-white font-bold hover:text-black">Log out</button> : <Link to='/login'><button className="btn bg-blue-500 text-white font-bold hover:text-black">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;