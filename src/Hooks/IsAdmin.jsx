import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";

const isAdmin = ({ children }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { data: isAdmin, isLoading } = useQuery({
        queryKey: ['checkingAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getTeacher/role/${user?.email}`)
            return res.data
        }
    })
    
    // useEffect(() => {
    //     setLoading(true)
    //     const checkAdmin = async () => {
    //         await axiosPublic.get(`/getTeacher/role/${user?.email}`)
    //             .then(res => {
    //                 console.log(object);
    //                 setLoading(false)
    //                 if (res.data?.role === "teacher") {
    //                     return children
    //                 }

    //                 if (res.data?.role !== "teacher") {
    //                     navigate('/')
    //                 }else {
    //                     navigate('/')
    //                 }
    //             })
    //     }
    //     checkAdmin()
    // }, [user])

    if (loading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    if (isAdmin?.role === "teacher") {
        return children
    }
    else {
        navigate('/')
    }

};

export default isAdmin;