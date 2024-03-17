import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const Glary = () => {
    const axiosPublic = useAxiosPublic()
   
    const { data: memorys, isLoading:dataLoading, refetch } = useQuery({
        queryKey: ['allMemory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMemorys')
            return res.data
        }
    })

    if (dataLoading) {
        return <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }
    
    return (
        <div className="mx-5 md:mx-10 lg:mx-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {
                    memorys?.map(memory => <Link to={`/showMemoryDetails/${memory._id}`} key={memory._id}>
                        <div className="shadow-xl h-[270px] cursor-pointer p-4 rounded-xl">
                            <div>
                                <img className="w-full h-[200px] rounded-lg" src={memory.image[0]} alt="" />
                            </div>
                            <p className="text-lg font-bold my-2">{memory.title.length > 20 ? memory.title.slice(0,19) : memory.title}{memory.title.length > 40 ? '...': ''}</p>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default Glary;