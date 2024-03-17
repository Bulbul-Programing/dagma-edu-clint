import React, { useState, useEffect, useContext } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import moment from 'moment';
import { AuthContext } from '../../../Component/AuthProvider/AuthProvider';

const UpdateResult = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [updatedPhoto, setUpdatedPhoto] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [profile, setProfile] = useState('')
    const result = useLoaderData()
    const [error, setError] = useState('')
    const { user } = useContext(AuthContext)

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
        const select = form.select.value
        const publisherEmail = form.publisherEmail.value
        const participant = form.participant.value
        const aPlus = form.aPlus.value
        const passed = form.passed.value
        const failed = form.failed.value
        const date = moment().format('l')

        const updateResultData = { updatePersonEmail: user.email, updatePerson: user.displayName, publisherEmail, publisherName: result.publisherName, date, title, select, resultPic: updatedPhoto, participant, aPlus, passed, failed }

        axiosSecure.put(`/result/update/${result._id}`, updateResultData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Notice update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/result')
                    setError('')
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='my-10'>
            <h1 className='text-xl font-bold text-center'>Update {result.title}</h1>
            <div className='w-1/2 mx-auto my-10'>
                {
                    loading ? <div className="skeleton w-[300px] h-[400px] mx-auto"></div> : <img className='w-[300px] mx-auto rounded-3xl' src={updatedPhoto} alt="" />
                }
                {
                    loading ? '' : updatedPhoto ? '' : <img className='w-[300px] mx-auto rounded-3xl' src={result.resultPic} alt="" />
                }
                <input onChange={handleProfile} id="actual-btn" hidden className="px-4 w-full  outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" /> <br />
                {
                    loading ? <span className="loading loading-dots loading- bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg"></span> : <label htmlFor="actual-btn" className='bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg'>Change Photo</label>
                }
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="title" placeholder="Result Title" id="" defaultValue={result.title} required />
                    <select className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="select" id="">
                        <option value="SSC">SSC</option>
                        <option value="HSC">HSC</option>
                    </select>
                    {/* <span className="text-slate-500 px-1">Result Photo</span> */}
                    {/* <input type="file" className="file-input mb-4 file-input-bordered w-full mt-1" name="resultPhoto" placeholder="" id="" required /> */}
                    <input type="email" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="publisherEmail" value={result.publisherEmail} readOnly />
                    <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="participant" placeholder="Participant" id="" defaultValue={result.participant} required min='0' />
                    <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="aPlus" placeholder="Got A+" id="" required defaultValue={result.aPlus} min='0' />
                    <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="passed" placeholder="Passed" id="" required defaultValue={result.passed} min='0' />
                    <input type="number" className="px-4 w-full mb-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="failed" placeholder="Failed" id="" required defaultValue={result.failed} min='0' />
                    {
                        loading ? <button className="btn w-full btn-ghost" disabled><span className="loading loading-spinner loading-md"></span></button> : <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Update" />
                    }
                </form>
            </div>
        </div>
    );
};

export default UpdateResult;