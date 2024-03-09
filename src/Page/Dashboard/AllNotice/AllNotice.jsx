import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import moment from "moment";

const AllNotice = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const [error, setError] = useState('')


    const { data: notices, isLoading, refetch } = useQuery({
        queryKey: ['allNotice'],
        queryFn: async () => {
            const response = await axiosSecure.get('/all/notice')
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
            .then()
            .catch(error => {
                setError('Please try to another Photo')
                setLoading(false)
            })
        const imageURL = res.data.data.display_url

        const title = data.noticeTitle
        const date = moment().format('l')
        const photo = imageURL
        const email = user.email
        const noticeData = { title, date, photo, email, status: 'pending' }
        axiosSecure.post('/add/notice', noticeData)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Notice add successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false)
                    setError('')
                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })

    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/notice/delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Notice delete successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Something is Wrong",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }

    const handleNoticeStatus = async (id, status) => {
        const updateStatus = { status: status }
        if (status === 'pending') {
            updateStatus.status = 'active'
        }
        else {
            updateStatus.status = 'pending'
        }

        await axiosSecure.put(`/notice/status/update?id=${id}`, updateStatus)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Notice status update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div className="m-2 md:m-5 lg:m-10">
            <h1 className="text-center text-3xl my-10 font-bold">Notice</h1>
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Notice</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {errors.noticeTitle && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Notice Title" {...register("noticeTitle", { require: true })} required /> <br />
                            {errors.email && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="email" value={user.email} {...register("email", { require: true })} readOnly /> <br />
                            {errors.image && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" {...register("image", { require: true })} required accept=".pdf, .jpg, .png" /> <br />
                            <p className="text-red-500 font-medium mb-4">{error}</p>
                            {
                                loading ? <button className="btn w-full btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Add Notice" />
                            }
                        </form>
                        <div className="modal-action ">
                            <form method="dialog" className="w-full">
                                <button onClick={() => setLoading(false)} className="btn w-full text-white bg-red-500">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className="overflow-x-auto shadow-xl p-5 rounded-xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notices?.map((notice, index) =>
                                <tr key={notice._id}>
                                    <th className="min-w-[20px]">
                                        <h1 className="text-lg">{index + 1}</h1>
                                    </th>

                                    <td className="w-[50px]">
                                        <h1 className="font-bold">{notice.date}</h1>
                                    </td>
                                    <td className="min-w-[400px]">
                                        <div className="flex items-center gap-x-5">
                                            <h1 className="font-bold">{notice.title.length > 55 ? notice.title.slice(0, 55) : notice.title}{notice.title.length > 55 ? '....' : ''}</h1>
                                            {
                                                notice.UpdateDate ? <div>
                                                    <p className="bg-slate-200 px-2 py-1 rounded-lg font-medium">{notice?.status} {notice?.UpdateDate}</p>
                                                </div> : ''
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleNoticeStatus(notice._id, notice.status)} className={`${notice.status === 'pending' ? 'bg-[#ffcc00]' : 'bg-blue-400'} text-white px-3 py-1 rounded-sm w-20`}>{notice.status}</button>
                                    </td>

                                    <th className="w-[300px]">
                                        <div className="flex justify-center">
                                            <Link to={`/dashboard/update/notice/${notice._id}`}><button className="btn bg-blue-500 mr-3 text-white hover:text-black">Update</button></Link>
                                            <button onClick={() => handleDelete(notice._id)} className="btn bg-red-500 text-white hover:text-black">Delete</button>
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

export default AllNotice;