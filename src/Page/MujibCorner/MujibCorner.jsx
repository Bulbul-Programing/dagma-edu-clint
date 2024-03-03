import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

const MujibCorner = () => {
    const axiosPublic = useAxiosPublic()

    const { data: cornerData, isLoading } = useQuery({
        queryKey: ['getCornerData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/get/corner/data')
            return res.data
        }
    })

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div>
            <div className="mb-10 bg-no-repeat bg-cover bg-[url('https://i.ibb.co/93c4wFH/Words-To-Describe-A-Good-Leader-1.webp')]">
                <h1 className="py-14 text-4xl font-bold text-center bg-slate-600 bg-opacity-40 text-white">{cornerData[0].title}</h1>
            </div>
            <div className=" mx-5 md:mx-10 lg:mx-10 my-5 md:my-10 lg:my-16">
                <img className="w-[300px] h-[350px] m-5 rounded-xl mx-auto md:m-5 lg:m-5 md:float-left lg:float-left" src={cornerData[0].profilePhoto} alt="" />
                <h1 className=" text-xl md:text-2xl lg:text-4xl font-medium">{cornerData[0].descriptionTitle}</h1>
                <p className="text-slate-500 mt-4 font-medium">{cornerData[0].description}</p>
            </div>
            <div className=" mx-5 md:mx-10 lg:mx-20 mb-5 md:mb-10 lg:mb-20">
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    // effect={'fade'}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay, EffectFade]}
                    className="mySwiper flex justify-end"
                >
                    {
                        cornerData[0]?.uploadedPhoto?.map((product, index) => <SwiperSlide key={index}>
                            <div className='flex justify-center'>
                                <img className='h-[230px] rounded-xl md:h-[400px] lg:h-[600px] w-full' src={product} alt="" />
                            </div></SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default MujibCorner;