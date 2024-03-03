import { useContext, useState } from "react";
import MujibCorner from "../../MujibCorner/MujibCorner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Corner = () => {
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { user } = useContext(AuthContext)

    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const { data: corner, isLoading } = useQuery({
        queryKey: ['getCornerData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/get/corner/data')
            return res.data
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const profile = form.profile.files
        const banner = form.banner.files
        const descriptionTitle = form.descriptionTitle.value
        const description = form.description.value
        setLoading(true)
        const imageFile = { image: profile[0] }
        const res = await axiosSecure.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)
            .then()
            .catch(error => {
                setError('Please try to another Photo')
            })
        const profilePhoto = res.data.data.display_url

        const bannerFile = { image: banner[0] }
        const response = await axiosSecure.post(imageHosting, bannerFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)
            .then()
            .catch(error => {
                setError('Please try to another Photo')
            })
        const bannerPhoto = response.data.data.display_url

        const promises = files.map(async (file) => {
            const formData = new FormData();
            formData.append('image', file);
            const response = await axiosSecure.post(imageHosting, formData, {
                params: {
                    key: imageHostingKey,
                },
            }
            );
            return response.data.data.url;
        });
        const uploadedImageUrls = await Promise.all(promises);

        const cornerData = { title, bannerPhoto, profilePhoto, uploadedPhoto: uploadedImageUrls, descriptionTitle, description, updatePersonName: user.displayName, updateEmail: user.email }
        axiosSecure.post(`/update/corner/${corner[0]._id}`, cornerData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Memory delete successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset()
                    setLoading(false)
                }
            })
    }

    if (isLoading) {
        <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div className="p-5 space-x-2">
                <button className="bg-blue-400 btn hover:text-black px-4 py-2 text-white font-medium cursor-pointer" onClick={() => document.getElementById('my_modal_5').showModal()}>Change Corner</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Change Corner Title</h3>
                        <form onSubmit={handleSubmit} className="mt-5">
                            <input type="text" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="title" placeholder="Change Title" id="" required />
                            <span className="text-slate-500 px-1">Change Profile</span>
                            <input type="file" className="file-input file-input-bordered w-full mb-2 mt-1" name="profile" placeholder="Change profile photo" id="" required />
                            <span className="text-slate-500 px-1">Change Banner</span>
                            <input type="file" className="file-input file-input-bordered w-full mb-2 mt-1" name="banner" placeholder="Change profile photo" id="" required />
                            <span className="text-slate-500 px-1">Change Photos</span>
                            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full mb-6 mt-1" name="photos" placeholder="Change all photos" id="" multiple required />
                            <input type="text" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="descriptionTitle" placeholder="Change Description title" id="" required />
                            <textarea name="description" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" rows="3" placeholder="Description" required></textarea>

                            <div className="modal-action mt-[-10px]">
                                {
                                    loading ? <button className="btn btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 text-white hover:text-black' type="submit" value="Update Corner" />
                                }
                                <form method="dialog">
                                    <button className="btn bg-red-500 text-white hover:text-black ml-3">Close</button>
                                </form>
                            </div>
                        </form>

                    </div>
                </dialog>
            </div>
            <div>
                <MujibCorner></MujibCorner>
            </div>
        </div>
    );
};

export default Corner;