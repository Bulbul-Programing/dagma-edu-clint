import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const EmailVerify = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div>
            {
                user.emailVerified ? navigate('/') :
                    <div className="my-20">
                        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">Please <span className="text-blue-400">VERIFY</span> Email</h1>
                        <p className="font-bold text-center">Check Your <span className="text-blue-400 underline">{user?.email}</span> for verification or <Link to='/' className="text-blue-400 underline">go Home</Link></p> 
                    </div>
            }

        </div>
    );
};

export default EmailVerify;