import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2'


const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { emailRegister, userUpdateProfile, user, emailVerification } = useContext(AuthContext)
    const [error, setError] = useState('')
    const Navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)

        const imageURL = res.data.data.display_url


        if (data.password.length < 6) {
            return setError('Please set Password minimum 6 character')
        }
        else if (!/[A-Z]/.test(data.password)) {
            return setError('Please enter minimum one capital later')
        }
        else if (!/[@#$%^&]/.test(data.password)) {
            return setError('Please enter minimum one special character')
        }
        else {
            emailRegister(data.email, data.password)
                .then(res => {
                    if (res.user.accessToken) {
                        userUpdateProfile(data.name, imageURL)
                            .then(res => {
                                setError('')
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Successfully Register",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                emailVerification()
                                .then(()=>{
                                    console.log('verification mail send');
                                })
                                Navigate('/emailVerify')
                            })
                    }
                })
                .catch(error => Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Something is Wrong",
                    showConfirmButton: false,
                    timer: 1500
                }))
        }

    };

    const handleGoogleLogin = () => {

    }


    return (
        <div className="flex justify-between items-center m-5 md:m-10 lg:m-20">
            <div className="w-[450px] shadow-xl px-5 py-10 rounded-2xl">
                <h1 className="text-2xl font-bold my-5 text-center">Please Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.name && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Full Name" {...register("name", { require: true })} /> <br />
                    {errors.image && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" {...register("image", { require: true })} /> <br />
                    {errors.email && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="email" placeholder="Email" {...register("email", { required: true })} /> <br />
                    {errors.password && <span className="text-red-400">This field is required</span>}
                    <p className="text-red-400">{error}</p>
                    <input className="px-4 w-full mb-6  outline-none border-2 focus:border-blue-400 py-3 rounded-lg text-slate-500" type="password" placeholder="Password" {...register("password", { required: true })} /> <br />
                    <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Register" />
                </form>
                <div>
                    <p className='mt-3 text-sm text-center font-medium mb-2'>Already have account <Link to='/login' className='text-blue-500 font-bold'>Please Login</Link> OR <Link to='/' className="font-bold text-blue-500">Go Home</Link></p>
                    <p className='text-center font-medium'>Or Sign in With</p>
                    <div className='flex justify-center gap-x-4'>
                        <button onClick={handleGoogleLogin}><FaGoogle className=' mt-2 text-3xl text-blue-500'></FaGoogle></button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 hidden md:block lg:block">
                <img className="md:w-[350px] lg:w-[600px]" src="https://i.ibb.co/HhHfR8J/5165290.jpg" alt="" />
            </div>
        </div>
    );
};

export default Register;