import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {




    const handleLogin = (e) => {
        e.preventDefault()
        console.log('login');
    }

    const handleGoogleLogin = () => {
        console.log('google login');
    }

    return (
        <div className="flex justify-between items-center md:m-10 lg:m-20">
            <div className="w-1/2">
                <img className="md:w-[350px] lg:w-[500px]" src="https://i.ibb.co/6bL83HL/20547283-6310507.jpg" alt="" />
            </div>
            <div className="w-[450px] shadow-2xl p-10 rounded-3xl">
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
