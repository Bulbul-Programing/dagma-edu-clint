import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";

const IsTeacher = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const checkAdmin = async () => {
            setLoad(true)
            await axiosPublic.get(`/getTeacher/role/${user?.email}`)
                .then(res => {
                    setLoad(false)
                    setUserInfo(res.data)
                })
        }
        checkAdmin()
    }, [user])


    if (load || loading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }

    if (userInfo?.teacherRole === "teacher") {
        return children
    }
    else {
        navigate('/')
    }

};

export default IsTeacher;