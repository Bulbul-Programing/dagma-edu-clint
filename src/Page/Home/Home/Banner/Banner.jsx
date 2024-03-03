import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {
    const axiosPublic = useAxiosPublic()

    const { data: memorys, isLoading} = useQuery({
        queryKey: ['allMemory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMemorys')
            return res.data
        }
    })
    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    return (
        <div>
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
                    memorys[0]?.image?.map((image, index) => <SwiperSlide key={index}>
                        <div className='flex justify-center'>
                            <img className='h-[230px] rounded-xl md:h-[400px] lg:h-[600px] w-full' src={image} alt="" />
                        </div></SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Banner;


// https://i.ibb.co/TMw9VQx/277220012-444420994101828-35151378046251719-n.jpg
// https://i.ibb.co/2hpCTT8/277221418-444420934101834-1065221039075039159-n.jpg
// https://i.ibb.co/FsXj2WF/277228506-444420867435174-5757105370677228772-n.jpg
// https://i.ibb.co/gP54Bqm/278264399-456402582903669-6523261682316127415-n.jpg
// https://i.ibb.co/njn8Zfh/278264434-456402859570308-2301887061665505822-n.jpg
// https://i.ibb.co/wJdS26N/278274420-456403082903619-4364089576689820306-n.jpg