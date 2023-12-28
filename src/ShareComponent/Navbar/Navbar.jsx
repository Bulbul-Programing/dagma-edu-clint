import { NavLink } from "react-router-dom";
import './navbar.css'


const Navbar = () => {

    const navItem = <>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='/'>Home</NavLink>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='Academy'>Our Academy</NavLink>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='forum'>Forum</NavLink>
        <NavLink className='mr-2 text-lg font-bold py-2 px-3' to='contact'>Contact Us</NavLink>
    </>

    return (
        <div className="navbar px-10 bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
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
                <button className="btn bg-blue-500 text-white font-bold hover:text-black">Login</button>
            </div>
        </div>
    );
};

export default Navbar;