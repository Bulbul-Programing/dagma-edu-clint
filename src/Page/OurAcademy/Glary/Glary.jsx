import { set, useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { memo, useState } from "react";

import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Teachers from "../Teachers/Teachers";


const Glary = () => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const axiosPublic = useAxiosPublic()
    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

    const { data: memorys, isLoading:dataLoading, refetch } = useQuery({
        queryKey: ['allMemory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMemorys')
            return res.data
        }
    })
    
    const handleUpload = async (e) => {
        e.preventDefault()

        console.log(e.target.title.value);
        setLoading(true)
        try {
            const promises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(imageHosting, formData, {
                    params: {
                        key: 'e81c07b7b12d825ec8a0650fb4781041', // Replace with your ImgBB API key
                    },
                });

                return response.data.data.url;
            });

            const uploadedImageUrls = await Promise.all(promises);

            console.log('Uploaded Image URLs:', uploadedImageUrls);

            const memoryData = { title: e.target.title.value, image: uploadedImageUrls }

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

    if (dataLoading) {
        return <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }
    
    return (
        <div className="mx-5 md:mx-10 lg:mx-20">
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Memory</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleUpload}>
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="title" placeholder="Memory Title" required /> <br />
                            <input className="pr-4 w-full mb-6 outline-none  border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered " onChange={handleFileChange} type="file" multiple />
                            <div>
                                {
                                    loading === true || files.length === 0 ? <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' disabled type="submit" value="ADD" /> : <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' type="submit" value="ADD" />
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {
                    memorys.map(memory => <Link to={`/showMemoryDetails/${memory._id}`} key={memory._id}>
                        <div className="shadow-xl h-[230px] cursor-pointer p-4 rounded-xl">
                            <div>
                                <img className="w-full rounded-lg" src={memory.image[0]} alt="" />
                            </div>
                            <p className="text-lg font-bold my-2">{memory.title.length > 40 ? memory.title.slice(0,39) : memory.title}{memory.title.length > 40 ? '...': ''}</p>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default Glary;