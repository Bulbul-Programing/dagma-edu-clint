import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import moment from 'moment';


const UpdateNotice = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [updatedPhoto, setUpdatedPhoto] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [profile, setProfile] = useState('')
    const noticeInfo = useLoaderData()
    const [error, setError] = useState('')

    const { data: f, isLoading, refetch } = useQuery({
        queryKey: [`${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleNotice/${id}`)
            return res.data
        }
    })

    useEffect(() => {
        if (profile?.length > 0) {
            setLoading(true)
            const uploadPhoto = async () => {
                const imageFile = { image: profile[0] }
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
                refetch()
                setUpdatedPhoto(res.data.data.display_url)
                setLoading(false)
            }
            uploadPhoto()
        }

    }, [profile])

    const handleProfile = (event) => {
        setProfile(event.target.files)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const UpdateDate = moment().format('l')
        const photo = updatedPhoto
        const status = 'pending'

        const updateNoticeData = { title, UpdateDate, status, photo: updatedPhoto, date: noticeInfo.date, email: noticeInfo.email }


        axiosSecure.put(`/notice/update/${noticeInfo._id}`, updateNoticeData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Notice update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/notice')
                    setError('')
                }
            })
            .catch(error => console.log(error))

    }


    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div className='my-10 mx-2'>
            <h1 className='text-xl font-bold text-center'>Update {noticeInfo.title}</h1>
            <div className='w-full md:w-3/4 lg:w-1/2 mx-auto my-10'>
                {
                    loading || isLoading ? <div className="skeleton w-[300px] h-[400px] mx-auto"></div> : <img className='w-[300px] mx-auto rounded-3xl' src={updatedPhoto} alt="" />
                }
                {
                    loading ? '' : updatedPhoto ? '' : <img className='w-[300px] mx-auto rounded-3xl' src={noticeInfo.photo} alt="" />
                }
                <input onChange={handleProfile} id="actual-btn" hidden className="px-4 w-full  outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" /> <br />
                {
                    loading ? <span className="loading loading-dots loading- bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg"></span> : <label for="actual-btn" className='bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg'>Change Photo</label>
                }
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <form onSubmit={handleSubmit}>
                    <input className="px-4 w-full my-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" defaultValue={noticeInfo?.title} placeholder="Title" name='title' required /> <br />
                    {
                        loading ? <button className="btn w-full btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Update" />
                    }
                </form>
            </div>
        </div>
    );
};

export default UpdateNotice;