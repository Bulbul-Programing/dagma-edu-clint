import { Link, NavLink } from "react-router-dom";
import './navbar.css'
import { useContext } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user, loading, logOut,emailLogin } = useContext(AuthContext)
    const navItem = <>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='/'>Home</NavLink>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='academy'>Our Academy</NavLink>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='forum'>Forum</NavLink>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='contact'>Contact Us</NavLink>
    </>

    if (loading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    console.log(user);
    const handleLogOut = () =>{
        logOut()
        .then(()=>{
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
        <div className="navbar px-10 bg-transparent shadow-xl">
            <div className="navbar-start">
                <div className="dropdown z-50">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
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
                <div className="flex items-center gap-x-3">
                    <p>{user?.displayName}</p>
                    <div>
                        {
                            user ? <img className="w-[40px] h-[40px] rounded-full" src={user?.photoURL} alt="" /> : ''
                        }
                    </div>
                </div>
                <div className="ml-3">
                    {
                        user ? <button onClick={handleLogOut} className="btn bg-blue-500 text-white font-bold hover:text-black">Log out</button> : <Link to='/login'><button className="btn bg-blue-500 text-white font-bold hover:text-black">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;