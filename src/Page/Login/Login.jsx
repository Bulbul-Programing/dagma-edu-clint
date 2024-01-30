import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const { emailLogin, googleLogin } = useContext(AuthContext)
    const Navigate = useNavigate()
    const [error, setError] = useState('')
    const axiosPublic = useAxiosPublic()

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
                    Navigate('/')
                    setError('')
                }
            })
            .catch(error => {
                setError('Password dose not match')
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const user = { name: res.user.displayName, email: res.user.email }
                axiosPublic.post(`/add/new/user`, user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Register",
                    showConfirmButton: false,
                    timer: 1500
                })
                Navigate('/')
            })
    }

    return (
        <div className="flex p-10 lg:p-20 gap-y-10  md:flex-row lg:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 lg:w-1/2 hidden md:block lg:block">
                <img src="https://i.ibb.co/6bL83HL/20547283-6310507.jpg" alt="" />
            </div>
            <div className="md:w-[370px] bg-[url('https://i.ibb.co/VVgHWbb/New-Project-8.jpg')] lg:w-[450px] shadow-2xl p-5 md:p-5 lg:p-10 rounded-3xl bg-cover bg-opacity-10 bg-[url('https://i.ibb.co/6bL83HL/20547283-6310507.jpg') md:bg-none lg:bg-none]">
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
                    <p className="my-3 text-red-500">{error}</p>
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
