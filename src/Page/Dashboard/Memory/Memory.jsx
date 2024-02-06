import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { memo, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";

const Memory = () => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
   
    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

    const { data: memorys, isLoading: dataLoading, refetch } = useQuery({
        queryKey: ['allMemory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMemorys')
            return res.data
        }
    })

    const handleUpload = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            const promises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(imageHosting, formData, {
                    params: {
                        key: imageHostingKey,
                    },
                });
                

            return response.data.data.url;
        });
        const uploadedImageUrls = await Promise.all(promises);
        const date = moment().format('l')
        const memoryData = { date, title: e.target.title.value, image: uploadedImageUrls }

        await axiosPublic.post('/addMemory', memoryData)
            .then(res => {
                if (res.data.insertedId) {
                    e.target.reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Memory add successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTitle('')
                    setLoading(false)
                    refetch()
                    setFiles([])
                }
            })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};

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
            axiosSecure.delete(`/memory/delete/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Memory delete successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
                    }
                })
                .catch(error => {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "something is wrong",
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    })

}

if (dataLoading) {
    return <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
}

return (
    <div className="m-2 md:m-5 lg:m-10">
        <h1 className="text-center font-bold text-3xl my-5">Memorys</h1>
        <div className="my-5 md:my-10 lg:my-10">
            <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Memory</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleUpload}>
                        <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="title" placeholder="Memory Title" required /> <br />
                        <input className="pr-4 w-full mb-6 outline-none  border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered " onChange={handleFileChange} type="file" multiple />
                        <div>
                            {
                                loading === true ? <button className='btn bg-blue-500 w-full text-center'><span className="loading loading-spinner loading-lg"></span></button> : files.length === 0 ? <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' type="submit" disabled value="ADD" /> : <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' type="submit" value="ADD" />
                            }
                        </div>
                    </form>
                    <div className="modal-action ">
                        <form method="dialog" className="w-full">
                            <button className="btn w-full text-white bg-red-500">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                memorys?.map(memory =>
                    <div key={memory._id}>
                        <div className="shadow-xl h-[230px] p-4 rounded-xl">
                            <Link to={`/showMemoryDetails/${memory._id}`}>
                                <div className="cursor-pointer">
                                    <img className="w-full h-[150px] rounded-lg" src={memory.image[0]} alt="" />
                                </div>
                            </Link>
                            <div className="flex justify-between items-center">
                                <Link to={`/showMemoryDetails/${memory._id}`}><p className="text-lg w-[100%] font-bold py-2">{memory.title.length > 20 ? memory.title.slice(0, 20) : memory.title}{memory.title.length > 20 ? '...' : ''}</p></Link>
                                <MdOutlineDeleteOutline onClick={() => handleDelete(memory._id)} className="cursor-pointer text-red-500 text-2xl"></MdOutlineDeleteOutline>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    </div>
);
};

export default Memory;