import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UpdateTeacher = () => {
    const {id} = useParams()
    const axiosPublic = useAxiosPublic()

    const {data, isLoading} = useQuery({
        queryKey: ['updateTeacher'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/teacher/${id}`)
            return res.data
        }
    })

    console.log(data);
    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div className='my-10'>
            <h1 className='text-3xl font-bold text-center'>Update Data About {data.name}</h1>
        </div>
    );
};

export default UpdateTeacher;