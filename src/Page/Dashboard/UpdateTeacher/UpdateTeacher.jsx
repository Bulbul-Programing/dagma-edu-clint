import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateTeacher = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [updatedPhoto, setUpdatedPhoto] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [profile, setProfile] = useState('')
    const loaderTeacherData = useLoaderData()
    const [error, setError] = useState('')

    const { data: teachersInfo, isLoading, refetch } = useQuery({
        queryKey: [`${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacher/${id}`)
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
        const name = form.name.value
        const subject = form.subject.value
        const number = form.number.value
        const photo = updatedPhoto || teachersInfo.photo
        const email = form.email.value

        const teacherData = { name, subject, number, photo, email }


        axiosSecure.put(`/update/teacher/${teachersInfo._id}`, teacherData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Teacher update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/teachers')
                    setError('')
                }
            })
            .catch(error => console.log(error))

    }

    if (isLoading === true) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div className='my-10'>
            <h1 className='text-3xl font-bold text-center'>Update Data About {loaderTeacherData?.name}</h1>
            <div className='w-1/2 mx-auto my-10'>
                {
                    loading ? <div className="skeleton w-[300px] h-[400px] mx-auto"></div> : <img className='w-[300px] mx-auto rounded-3xl' src={updatedPhoto} alt="" />
                }
                {
                    loading ? '' : updatedPhoto ? '' : <img className='w-[300px] mx-auto rounded-3xl' src={teachersInfo.photo} alt="" />
                }
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <input onChange={handleProfile} id="actual-btn" hidden className="px-4 w-full  outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" /> <br />
                {
                    loading ? <span className="loading loading-dots loading- bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg"></span> : <label for="actual-btn" className='bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg'>Change Photo</label>
                }
                <form onSubmit={handleSubmit}>
                    <input className="px-4 w-full my-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" defaultValue={loaderTeacherData.name} placeholder="Teacher Name" name='name' required /> <br />
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="text" defaultValue={loaderTeacherData.subject} placeholder="What subject does he teach?" name='subject' required /> <br />
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="email" defaultValue={loaderTeacherData?.email} placeholder="Email" name='email' required /> <br />
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="number" defaultValue={loaderTeacherData.number} placeholder="Phone Number" name='number' required /> <br />
                    {
                        loading ? <button className="btn w-full btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Update" />
                    }
                </form>
            </div>
        </div>
    );
};

export default UpdateTeacher;