import { Outlet } from "react-router-dom";
import Navbar from "./ShareComponent/Navbar/Navbar";
import Footer from "./ShareComponent/Footer/Footer";


const MainRoute = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainRoute;