import useAxiosPublic from "../../../Hooks/useAxiosPublic";

import { useQuery } from "@tanstack/react-query";

const Teachers = () => {
    const axiosPublic = useAxiosPublic()

    const { data: teachers, isLoading, refetch } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allTeachers')
            return res.data
        }

    })

    

    if (isLoading) {
        return <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }
    
    return (
        <div className="m-10">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {
                    teachers.map(teacher => <div key={teacher._id} className="shadow-2xl p-5 text-center space-y-1 rounded-2xl ">
                        <img className="w-[150px] mb-3 border-2 h-[150px] mx-auto rounded-full" src={teacher.photo} alt="" />
                        <h1 className="text-xl font-bold">{teacher.name}</h1>
                        <p className="text-slate-600 font-medium">Subject: <span className="font-bold text-black">{teacher.subject}</span></p>
                        <p className="text-slate-600 font-medium">Phone:  <span className="font-bold text-black">{teacher.number}</span></p>
                    </div>)
                }
                
            </div>
        </div>

    );
};

export default Teachers;