import { useContext, useState } from "react";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";



const CreatePost = () => {
    const { user } = useContext(AuthContext)
    const [imgFile, setImgFile] = useState([])
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')
    const [commentError, setCommentError] = useState('')
    const [comment, setComment] = useState('')

    const { data: allPost, isLoading, refetch } = useQuery({
        queryKey: ['getAllPost'],
        queryFn: async () => {
            const response = await axiosSecure.get('/all/forum/post')
            return response.data
        }
    })

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

            const postData = { name: user?.displayName, creatorPhoto: user?.photoURL, email: user?.email, postTitle, photos: uploadedImageUrls, date, hour, allCommentData: [] }
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
                        e.target.reset()
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

    // const handleLike = (id) => {
    //     axiosSecure.put(`/add/like/${user?.email}`, { id })
    //         .then(res => {
    //             if (res.data.modifiedCount > 0) {
    //                 refetch()
    //             }
    //         })
    // }
    const commentText = (e) => {
        setComment(e.target.value)
    }
    const handleComment = async (id) => {
        if (comment.length < 1) {
            setCommentError('Please Write Comment')
        }
        else {
            const date = moment().format('l')
            const hour = moment().format('LTS');
            const idForComment = Math.round(Math.random() * 1000000) + hour
            const commentData = { idForComment, commentId: id, comment: comment, userEmail: user.email, name: user.displayName, creatorPhoto: user?.photoURL, date, hour, }
            await axiosSecure.put(`/add/comment/${id}`, commentData)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        setComment('')
                        setCommentError('')
                        refetch()
                    }
                })
        }
    }

    const handleCommentDelete = async (postId, commentId) => {
        const deletedData = { postId: postId, commentId: commentId }
        await axiosSecure.put('/delete/comment', deletedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                }
            }
            )
    }

    const handlePostDelete = async (id) => {
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
                await axiosSecure.delete(`/post/delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Post Delete successfully",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            }
        });
    }

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div className="w-[95%] md:w-[80%] lg:w-[80%] mx-auto my-10 p-2 md:p-5 lg:p-5 border bg-blue-50 rounded-xl">
                <div className="flex  items-center justify-between gap-x-5 ">
                    <div className="w-3/12 md:w-2/12 lg:w-2/12">
                        <img className="w-[70px] h-[70px] rounded-full" src={user?.photoURL} alt="" />
                    </div>
                    <form onSubmit={handleSubmit} className="w-10/12">
                        <input className="px-4 w-full outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="postTitle" placeholder="এখানে লিখুন" required />
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
                            <div className="flex justify-between items-center border-b pb-2">
                                <div className="flex items-center gap-x-3">
                                    <img className="w-[40px] h-[40px] rounded-full" src={post.creatorPhoto} alt="" />
                                    <div>
                                        <h3 className=" font-semibold">{post.name}</h3>
                                        <p className="text-slate-400 text-xs font-medium"><span className="mr-2">{post.hour}</span> {post.date}</p>
                                    </div>
                                </div>
                                <div>
                                    {
                                        post.email === user.email && <MdDeleteOutline onClick={() => handlePostDelete(post._id)} className="text-2xl text-red-400 cursor-pointer"></MdDeleteOutline>
                                    }
                                </div>
                            </div>
                            <h1 className="text-slate-500 p-4 font-medium">{post.postTitle}</h1>
                            <div>
                                {
                                    post.photos.map(photo =>
                                        <img key={post._id} className=" rounded-xl shadow-md mb-4 max-w-[300px] md:max-w-[500px] lg:max-w-[600px] max-h-[400px] mx-auto" src={photo} alt="" />
                                    )
                                }
                            </div>
                            <div className="mb-4">
                                {/* <div className="w-2/12 md:flex lg:flex gap-x-2">
                                    <FcLikePlaceholder onClick={() => handleLike(post._id)} className="cursor-pointer text-3xl"></FcLikePlaceholder>
                                    {
                                        post?.likedAllData?.map(person => person.email === user?.email ? <FcLike className="text-3xl"></FcLike> : <FcLikePlaceholder onClick={()=>handleLike(post._id)} className="cursor-pointer text-3xl"></FcLikePlaceholder>)
                                    }
                                    {
                                        post?.likedAllData.length === 0 && <FcLikePlaceholder onClick={()=>handleLike(post._id)} className="cursor-pointer text-3xl"></FcLikePlaceholder>
                                    }
                                    <h1 className="p-1">{post?.likedAllData.length}</h1>
                                </div> */}
                                <div className="flex gap-x-3 items-center">
                                    <input onChange={commentText} value={comment} className="px-4 w-full outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" name="" id="" placeholder="Write Comment" required />
                                    <button onClick={() => handleComment(post._id)} className="btn bg-blue-500 text-white hover:text-black" type="submit" name="" id="">Submit</button>
                                </div>
                                <p className="text-red-500 text-sm p-1">{commentError}</p>
                            </div>
                            <div className="max-h-[200px] mt-4 overflow-y-scroll">
                                {
                                    post?.allCommentData?.map((comment, index) => comment.commentId === post._id &&
                                        <div key={index} className="shadow-md p-4 m-3 rounded-xl bg-slate-50">
                                            <div className="flex justify-between items-center border-b">
                                                <div className="flex items-center gap-x-3 pb-2">
                                                    <img className="w-[30px] h-[30px] rounded-full" src={comment.creatorPhoto} alt="" />
                                                    <div>
                                                        <h3 className="font-semibold text-sm">{comment.name}</h3>
                                                        <p className="text-slate-400 text-xs font-medium"><span className="mr-2">{comment.hour}</span> {comment.date}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        comment.userEmail === user.email && <MdDeleteOutline onClick={() => handleCommentDelete(post._id, comment.idForComment)} className="text-2xl text-red-400 cursor-pointer"></MdDeleteOutline>
                                                    }
                                                </div>
                                            </div>
                                            <p className="font-medium p-3">{comment.comment}</p>
                                        </div>)
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CreatePost;