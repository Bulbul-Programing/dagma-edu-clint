import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllTeachers = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [loading, setLoading] = useState(false)

    const { data: teachers, isLoading, refetch } = useQuery({
        queryKey: ['dashboardTeachers'],
        queryFn: async () => {
            const response = await axiosSecure.get('/allTeachers')
            return response.data
        }
    })
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        setLoading(true)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)

        const imageURL = res.data.data.display_url

        const name = data.name
        const subject = data.subject
        const number = data.number
        const photo = imageURL
        const email = data.email
        const teacherProfile = { name, subject, number, photo, email }

        axiosSecure.post('/addTeacher', teacherProfile)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Teacher add successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })

    }

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div className="m-2 md:m-5 lg:m-10">
            <h1 className="text-center text-3xl my-10 font-bold">Teachers</h1>
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Teacher</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {errors.name && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Teacher Name" {...register("name", { require: true })} required /> <br />
                            {errors.subject && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="text" placeholder="What subject does he teach?" {...register("subject", { require: true })} required /> <br />
                            {errors.email && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="email" placeholder="Email" {...register("email", { require: true })} required /> <br />
                            {errors.number && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="number" placeholder="Phone Number" {...register("number", { require: true })} required /> <br />
                            {errors.image && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" {...register("image", { require: true })} required /> <br />
                            {
                                loading ? <button className="btn w-full btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Add Teacher" />
                            }
                        </form>
                        <div className="modal-action ">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full text-white bg-red-500">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="overflow-x-auto shadow-xl p-5 rounded-xl">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Department</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers?.map((teacher, index) =>
                                <tr key={teacher._id}>
                                    <th className="min-w-[50px]">
                                        <h1 className="text-lg">{index + 1}</h1>
                                    </th>
                                    <td className="min-w-[250px]">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16">
                                                    <img src={teacher.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{teacher.name}</div>
                                                <h1 className="text-slate-600 font-semibold">{teacher?.email}bulbul@gmail.com</h1>
                                                <p className="text-slate-600 my-1">Phone: <span className="font-bold">{teacher.number}</span> </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="min-w-[150px]">
                                        <h1 className="font-bold">{teacher.subject}</h1>
                                    </td>

                                    <th className="w-[300px]">
                                        <div className="flex justify-center">
                                            {/* <button className="btn bg-blue-500 mr-3 text-white hover:text-black" onClick={() => document.getElementById('my_modal_6').showModal()}>Update</button>
                                            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <form onSubmit={(e)=>handleUpdate(e,teacher._id)}>
                                                        <input type="text" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" name="name" placeholder="Teacher name" id="" />
                                                        <input type="text" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" name="subject" placeholder="What subject does he teach?" id="" />
                                                        <input type="number" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" name="number" placeholder="Phone number" id="" />
                                                        <input type="email" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" name="email" placeholder="Email" id="" />
                                                        <input type="date" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" name="joiningDate" placeholder="Joining Date" id="" />
                                                        
                                                        {
                                                            loading ? <button className="btn w-full btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Add Teacher" />
                                                        }
                                                    </form>
                                                    <div className="modal-action ">
                                                        <form method="dialog" className="w-full">
                                                            <button className="btn w-full text-white bg-red-500">Cancel</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog> */}
                                            <Link to={`/dashboard/update/teacher/${teacher._id}`}><button className="btn bg-blue-500 mr-3 text-white hover:text-black">Update</button></Link>
                                            <button className="btn bg-red-500 text-white hover:text-black">Delete</button>
                                        </div>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTeachers;