import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
    const { emailLogin, resetPassword } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        emailLogin(email, password)
            .then((res) => {
                if (res.user.accessToken) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully Login",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/')
                }
            })
    }

    const handleGoogleLogin = () => {
        console.log('google login');
    }

    return (
        <div className="flex gap-x-5 gap-y-10 flex-col-reverse md:flex-row-reverse lg:flex-row-reverse justify-between items-center">
            <div className="w-full lg:w-1/2">
                <img className="md:w-[350px] lg:w-[500px]" src="https://i.ibb.co/6bL83HL/20547283-6310507.jpg" alt="" />
            </div>
            <div className="w-[450px] shadow-2xl p-10 rounded-3xl bg-cover bg-opacity-80 bg-[url('https://i.ibb.co/6bL83HL/20547283-6310507.jpg')]">
                <h1 className="text-3xl font-bold text-center">Please Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="px-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="email" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="px-4 mb-3 outline-none border-2 focus:border-blue-400 py-3 rounded-lg text-slate-500" name="password" required />
                    </div>
                    <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Login" />
                </form>
                <div>
                    <Link to='/changePassword'><p className="my-3 text-red-500">Forget password?</p></Link>
                    <p className='mt-3 text-center mb-2'>New hare <Link to='/register' className='text-blue-500 font-bold'>Create a New Account</Link> OR <Link to='/' className="font-bold text-blue-500">Go Home</Link></p>
                    <p className='text-center'>Or Sign in With</p>

                    <div className='flex justify-center gap-x-4'>
                        <button onClick={handleGoogleLogin}><FaGoogle className=' mt-2 text-3xl text-blue-500'></FaGoogle></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
