import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const AddResult = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

    const { data: allResult, refetch, isLoading } = useQuery({
        queryKey: ['allResult'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all/result')
            return res.data
        }
    })

    const { data: teachers, isLoading: teacherDataLoading, refetch: reload } = useQuery({
        queryKey: ['getTeachersForAddResult'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/getTeacher/role/${user.email}`)
            return response.data
        }
    })
    console.log(teachers);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const select = form.select.value
        const resultImage = form.resultPhoto.files
        const participant = form.participant.value
        const aPlus = form.aPlus.value
        const passed = form.passed.value
        const failed = form.failed.value
        const date = moment().format('l')

        setLoading(true)
        const imageFile = { image: resultImage[0] }
        const res = await axiosSecure.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)
            .then()
            .catch(error => {
                setError('Please try to another Photo')
            })
        const resultPic = res.data.data.display_url
        setLoading(false)
        const resultData = { publisherEmail: user.email, publisherName: user.displayName, date, title, select, resultPic, participant, aPlus, passed, failed }
        axiosSecure.post('/add/result', resultData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Result Publish successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch()
                    setError('')
                    form.reset()
                }
            })
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/delete/result/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Result delete successfully",
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

    if (isLoading || teacherDataLoading) {
        <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div className="mx-10">
            <h1 className="text-center text-3xl my-10 font-bold">Results</h1>
            <div className="my-5 md:my-10 lg:my-10">
                <button className="bg-blue-400 btn hover:text-black px-4 py-2 text-white font-medium cursor-pointer" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Result</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add New Results</h3>
                        <form onSubmit={handleSubmit} className="mt-5">
                            <input type="text" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="title" placeholder="Result Title" id="" required />
                            <select className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="select" id="">
                                <option value="JSC">JSC</option>
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                            </select>
                            <span className="text-slate-500 px-1">Result Photo</span>
                            <input type="file" className="file-input mb-4 file-input-bordered w-full mt-1" name="resultPhoto" placeholder="" id="" required />
                            <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="participant" placeholder="Participant" id="" required min='0' />
                            <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="aPlus" placeholder="Got A+" id="" required min='0' />
                            <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="passed" placeholder="Passed" id="" required min='0' />
                            <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="failed" placeholder="Failed" id="" required min='0' />
                            <label className="modal-action mt-[-10px]">
                                {
                                    loading ? <button className="btn btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 text-white hover:text-black' type="submit" value="Publish Result" />
                                }
                                <form method="dialog">
                                    <button className="btn bg-red-500 text-white hover:text-black ml-3">Close</button>
                                </form>
                            </label>
                        </form>

                    </div>
                </dialog>
            </div>
            <div className="overflow-x-auto shadow-xl p-5 rounded-xl">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="text-center border ">Date</th>
                            <th className="text-center border min-w-[200px]">Title</th>
                            <th className="text-center border ">Participant</th>
                            <th className="text-center border ">Got A+</th>
                            <th className="text-center border ">Passed</th>
                            <th className="text-center border ">Fail</th>
                            <th className="text-center border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allResult?.map((result, index) =>
                                <tr key={result._id} className="border py-0">

                                    <td className="w-[50px]">
                                        <h1 className="font-bold border-r">{result.date}</h1>
                                    </td>
                                    <td className="min-w-[200px]">
                                        <div className="flex items-center gap-x-5">
                                            <h1 className="font-bold">{result.title.length > 55 ? result.title.slice(0, 55) : result.title}{result.title.length > 55 ? '....' : ''}</h1>
                                        </div>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.participant}</h1>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.aPlus}</h1>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.passed}</h1>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.failed}</h1>
                                    </td>

                                    <th className="">
                                        <span className="flex justify-center">
                                            <Link to={`/dashboard/update/result/${result._id}`} reloadData={'refetch'}><button className="btn bg-blue-500 mr-3 text-white hover:text-black">Update</button></Link>
                                            {
                                                teachers?.teacherRole === 'Admin' && <button onClick={() => handleDelete(result._id)} className="btn bg-red-500 text-white hover:text-black">Delete</button>
                                            }
                                        </span>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddResult;