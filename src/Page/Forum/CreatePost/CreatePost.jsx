import { useContext, useState } from "react";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";


const CreatePost = () => {
    const { user } = useContext(AuthContext)
    const [imgFile, setImgFile] = useState([])
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')

    const { data: allPost, isLoading, refetch } = useQuery({
        queryKey: ['getAllPost'],
        queryFn: async () => {
            const response = await axiosSecure.get('/all/forum/post')
            return response.data
        }
    })
    console.log(allPost);
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

    const uploadPhoto = async (e) => {
        const file = e.target.files
        setImgFile([...file])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const promises = imgFile.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(imageHosting, formData, {
                    params: {
                        key: imageHostingKey
                    },
                });
                return response.data.data.url;
            });
            const uploadedImageUrls = await Promise.all(promises);
            const postTitle = e.target.postTitle.value
            const date = moment().format('l')
            const hour = moment().format('LTS');

            const postData = { name: user.displayName, creatorPhoto: user.photoURL, email: user.email, postTitle, photos: uploadedImageUrls, date, hour }
            await axiosSecure.post('/create/newPost', postData)
                .then(res => {
                    if (res.data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Post create successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setLoading(false)
                        setImgFile([])
                        setError('')
                    }
                })
                .catch(error => {
                    setLoading(false)
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Something is wrong",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(error)
                })
        } catch (error) {
            setError('Please try another')
            setLoading(false)
            console.error('Error uploading images:', error);
        }
    }

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div className="w-[95%] md:w-[80%] lg:w-[80%] mx-auto my-10 p-2 md:p-5 lg:p-5 border bg-blue-50 rounded-xl">
                <div className="flex  items-center justify-between gap-x-5 ">
                    <div className="w-3/12 md:w-2/12 lg:w-2/12">
                        <img className="w-[80px] h-[80px] rounded-full" src={user.photoURL} alt="" />
                    </div>
                    <form onSubmit={handleSubmit} className="w-10/12">
                        <input className="px-4 w-full outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="postTitle" placeholder="এখানে লিখুন" />
                        <div className="flex justify-between mt-3 gap-x-3">
                            {
                                loading === true ? <button className=' text-center'><span className="loading loading-spinner loading-sm"></span></button> : <input className="file-input file-input-bordered w-full max-w-xs" onChange={uploadPhoto} type="file" id="problemPhoto" accept=".jpg, .png, .jpeg, .pdf" />
                            }
                            <input className="btn bg-blue-500 text-white hover:text-black" type="submit" name="" id="" />
                        </div>
                    </form>
                </div>
                <p className="text-red-500 text-center font-medium mt-2">{error}</p>
            </div>
            <div className="mx-5">
                {
                    allPost.map(post =>
                        <div key={post._id} className="shadow-lg p-4 rounded-xl my-5">
                            <div className="flex items-center gap-x-3 border-b pb-2">
                                <img className="w-[50px] h-[50px] rounded-full" src={post.creatorPhoto} alt="" />
                                <div>
                                    <h3 className="text-lg font-semibold">{post.name}</h3>
                                    <p className="text-slate-400 font-medium"><span className="mr-2">{post.hour}</span> {post.date}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    post.photos.map(photo =>
                                        <img className=" rounded-xl shadow-md mb-4 max-w-[300px] md:max-w-[500px] lg:max-w-[600px] max-h-[400px] mx-auto" src={photo} alt="" />
                                    )
                                }
                            </div>
                            <div className="flex items-center">
                                <div className="w-1/12 text-4xl">
                                    <FcLike></FcLike>
                                    {/* <FcLikePlaceholder></FcLikePlaceholder> */}
                                </div>
                                <form className="flex w-11/12 gap-x-3 items-center">
                                    <input className="px-4 w-full outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="" id="" placeholder="Write Comment" />
                                    <input className="btn bg-blue-500 text-white hover:text-black" type="submit" name="" id="" />
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CreatePost;