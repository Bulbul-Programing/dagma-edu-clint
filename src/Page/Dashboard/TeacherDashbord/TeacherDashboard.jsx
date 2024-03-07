import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../Component/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useContext } from 'react';

const TeacherDashboard = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {data : teacherInfo} = useQuery({
        queryKey: ['allTeacherInfoForDB'],
        queryFn : async() => {
            const res = await axiosSecure.get(`/getTeacher/role/${user.email}`)
            return res.data
        }
    })

    console.log(teacherInfo);

    return (
        <div className="flex">
            <div className=" h-svh px-5 space-y-5 pt-5 bg-blue-100 w-[200px] md:w-3/12 lg:w-2/12">
                <div>
                    <img className="w-[80px] mx-auto h-[80px] rounded-full" src={user.photoURL} alt="" />
                    <p className="text-center my-2 font-bold">{user.displayName}</p>
                </div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/teacherDB/home' className='w-full text-center py-2'>Teacher Home</NavLink>
                    <NavLink to='/teacherDB/allTeacher' className='w-ful text-center py-2'>Teachers</NavLink>
                    <NavLink to='/teacherDB/memory' className='w-ful text-center py-2'>Memory</NavLink>
                    <NavLink to='/teacherDB/notice' className='w-full text-center py-2'>Notice</NavLink>
                    <NavLink to='/teacherDB/result' className='w-full text-center py-2'>Results</NavLink>
                </div>
                <div className="divider"></div>
                <div className="  flex flex-col gap-y-2">
                    <NavLink to='/' className='w-full text-center py-2'>Home</NavLink>
                </div>
            </div>

            <div className="overflow-auto w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default TeacherDashboard;