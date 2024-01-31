import { useContext } from "react";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useNavigate } from "react-router-dom";

const isAdmin = ({children}) => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const {data:isAdmin, isLoading} = useQuery({
        queryKey:['checkingAdmin'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/getTeacher/role/${user?.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    if(isAdmin?.role === "teacher"){
        return children
    }
    else{
        navigate('/')
    }
    
};

export default isAdmin;