import { Outlet } from "react-router-dom";
import Navbar from "./ShareComponent/Navbar/Navbar";
import Footer from "./ShareComponent/Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "./Component/AuthProvider/AuthProvider";
import EmailVerify from "./Component/EmailVerify/EmailVerify";


const MainRoute = () => {
    const { user } = useContext(AuthContext)

    if (user?.emailVerified === false) {
        return <EmailVerify></EmailVerify>
    }

    return (
        <div>
            <div>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainRoute;