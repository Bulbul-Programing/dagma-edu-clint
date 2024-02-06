import { useContext } from "react";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const IsLogin = ({ children }) => {
    const location = useLocation()
    const { user , loading} = useContext(AuthContext)
    
    if(loading){
        return <span className="loading loading-dots loading-lg my-20 text-center"></span>
    }
    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default IsLogin;