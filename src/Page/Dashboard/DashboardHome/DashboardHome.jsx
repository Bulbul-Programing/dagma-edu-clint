import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure()
    
    const { data:teachers, isLoading } = useQuery({
        queryKey: ['dashboardTeachers'],
        queryFn: async () => {
            const response = await axiosSecure.get('/allTeachers')
            return response.data
        }
    })
    const { data:memorys, isLoading: dataLoading, refetch } = useQuery({
        queryKey: ['allMemory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMemorys')
            return res.data
        }
    })
    const { data:notice, isLoading: noticeLoading } = useQuery({
        queryKey: ['allNotice'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all/notice')
            return res.data
        }
    })

    if (isLoading || dataLoading || noticeLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 m-5 md:m-5 lg:m-20">
            <Link to='/dashboard/teachers'>
                <div className="bg-[#3559E0] min-w-[150px] p-5 rounded-xl font-bold text-white">
                    <h1 className="text-4xl">{teachers?.length}</h1>
                    <p className="text-lg font-bold">Teachers</p>
                </div>
            </Link>
            <Link to='/dashboard/memory'>
                <div className="bg-orange-500 min-w-[150px] p-5 rounded-xl font-bold text-white">
                    <h1 className="text-4xl">{memorys?.length}</h1>
                    <p className="text-lg font-bold">Memorys</p>
                </div>
            </Link>
            <Link to='/dashboard/notice'>
                <div className="bg-[#7743DB] min-w-[150px] p-5 rounded-xl font-bold text-white">
                    <h1 className="text-4xl">{notice?.length}</h1>
                    <p className="text-lg font-bold">Notice</p>
                </div>
            </Link>
        </div>
    );
};

export default DashboardHome;