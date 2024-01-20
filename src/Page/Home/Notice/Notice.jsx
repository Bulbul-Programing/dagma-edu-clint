import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Notice = () => {
    const axiosPublic = useAxiosPublic()

    const { data: notices, isLoading } = useQuery({
        queryKey: ['allNotices'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all/notice')
            return res.data
        }
    })

    if (isLoading) {
        return <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }
    
    return (
        <div className="bg-slate-200 my-5 mx-5 md:mx-10 lg:mx-10 rounded-lg flex items-center ">

            <button className="btn bg-blue-400 hover:text-slate-600 text-white font-bold" onClick={() => document.getElementById('my_modal_5').showModal()}>All Notice</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">All Notice</h3>
                    <div>
                        {
                            notices.map((notice, index) =>
                                <a href={notice.photo} className="hover:text-blue-400 transition" target="_blank">
                                    <div key={notice._id} className="mr-10 mb-3 shadow-md px-2 py-3 rounded-lg">
                                        <p>{index + 1}. {notice.title.length > 42 ? notice.title.slice(0,42) : notice.title}{notice.title.length > 42 ? '...' : ''}</p>
                                    </div>
                                </a>
                            )
                        }
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog >
            <div className="overflow-hidden">
                <Marquee pauseOnHover={true} className="">
                    {
                        notices.map(notice =>
                            <div key={notice._id} className="mr-10"><a href={notice.photo} className="hover:text-blue-400 transition" target="_blank"> | {notice.title} | </a></div>
                        )
                    }
                </Marquee>
            </div>
        </div >
    );
};

export default Notice;