import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                modules={[Pagination,Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide><img className='h-[250px] md:h-[400px] lg:h-[600px] w-full' src="https://i.ibb.co/FsXj2WF/277228506-444420867435174-5757105370677228772-n.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[250px] md:h-[400px] lg:h-[600px] w-full' src="https://i.ibb.co/TMw9VQx/277220012-444420994101828-35151378046251719-n.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[250px] md:h-[400px] lg:h-[600px] w-full' src="https://i.ibb.co/2hpCTT8/277221418-444420934101834-1065221039075039159-n.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[250px] md:h-[400px] lg:h-[600px] w-full' src="https://i.ibb.co/gP54Bqm/278264399-456402582903669-6523261682316127415-n.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[250px] md:h-[400px] lg:h-[600px] w-full' src="https://i.ibb.co/njn8Zfh/278264434-456402859570308-2301887061665505822-n.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='h-[250px] md:h-[400px] lg:h-[600px] w-full' src="https://i.ibb.co/wJdS26N/278274420-456403082903619-4364089576689820306-n.jpg" alt="" /></SwiperSlide>
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