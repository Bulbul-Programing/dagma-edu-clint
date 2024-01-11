import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const UpdateTeacher = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const [updatedPhoto, setUpdatedPhoto] = useState('')
    const [selectImg, setSelectImg] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['updateTeacher'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teacher/${id}`)
            return res.data
        }
    })

    const g = watch({
        name: 'image',
    })
    
    if(g.image) {
        if(g.image[0].name){
            setSelectImg(g.image[0].name)
        }
        const uploadPhoto = async () => {
            
            const imageFile = { image: g?.image[0] }
            const res = await axiosPublic.post(imageHosting, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            },)
            refetch()
            setUpdatedPhoto(res.data.data.display_url)
        }
        uploadPhoto()
        
    }


    console.log(selectImg);

    const onSubmit = (data) => {

    }


    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div className='my-10'>
            <h1 className='text-3xl font-bold text-center'>Update Data About {data.name}</h1>
            <div className='w-1/2 mx-auto my-10'>
                {
                    updatedPhoto ? <img className='w-[300px] mx-auto rounded-3xl' src={updatedPhoto} alt="" /> : <img className='w-[300px] mx-auto rounded-3xl' src={data.photo} alt="" />
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input id="actual-btn" hidden className="px-4 w-full  outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" {...register("image", { require: true })} required /> <br />
                    <label for="actual-btn" className='bg-blue-400 px-4 py-2 cursor-pointer text-white font-medium rounded-lg'>Change Photo</label>
                    {errors.name && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full my-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" defaultValue={data.name} placeholder="Teacher Name" {...register("name", { require: true })} required /> <br />
                    {errors.subject && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="text" defaultValue={data.subject} placeholder="What subject does he teach?" {...register("subject", { require: true })} required /> <br />
                    {errors.number && <span className="text-red-400">This field is required</span>}
                    <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="number" defaultValue={data.number} placeholder="Phone Number" {...register("number", { require: true })} required /> <br />
                    {errors.image && <span className="text-red-400">This field is required</span>}
                    <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Update" />

                </form>
            </div>
        </div>
    );
};

export default UpdateTeacher;