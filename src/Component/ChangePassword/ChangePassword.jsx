import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const { resetPassword } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleResetPassword = async(e) => {
        e.preventDefault()
        const email = e.target.email.value
        console.log(email);
       await resetPassword(email)
            .then((res) => {
                Swal.fire({
                    title: "Check Mail",
                    text: "Please check your mail for change password",
                    icon: "warning"
                });
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="mx-5 my-20 md:mx-10 lg:mx-20">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Please Provide your email for change password</h1>
            <div className="flex gap-x-5 gap-y-10 flex-col-reverse md:flex-row-reverse lg:flex-row-reverse justify-between items-center ">
                <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <img className="md:w-[350px] lg:w-[500px]" src="https://i.ibb.co/vQNgPyS/7070629-3293465.jpg" alt="" />
                </div>
                <div className=" lg:w-[450px] shadow-2xl p-10 rounded-3xl">
                    <form onSubmit={handleResetPassword}>
                        <input type="email" placeholder="Email" className="px-4 w-full outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="email" required />
                        <input className='btn mt-6 bg-blue-500 w-full text-white hover:text-black' type="submit" value="Submit" />
                    </form>
                    <div>
                        <p className='mt-3 text-center mb-2'>New hare <Link to='/register' className='text-blue-500 font-bold'>Create a New Account</Link> OR <Link to='/' className="font-bold text-blue-500">Go Home</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;