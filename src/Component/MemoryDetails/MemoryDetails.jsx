import { useActionData, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const MemoryDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()

    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        
    };

    const { data: memoryData, isLoading } = useQuery({
        queryKey: ['memoryDetailsData'],
        queryFn: async () => {
            const response = await axiosPublic.get(`/singleMemory/${id}`)
            return response.data
        }
    })


    if (isLoading) {
        <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center my-5 md:my-10 lg:my-10">{memoryData?.title}</h1>
            <div className="m-5 md:m-5 lg:m-20">
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom,]}
                    elementClassNames="custom-wrapper-class"
                    onBeforeSlide={onBeforeSlide}
                    mode="lg-fade"
                >
                    {
                        memoryData?.image.map((singleImage, index) => 
                        <a data-lg-size="1406-1390" key={index}
                            className="gallery-item " download={true} href={singleImage}>
                            <img className="img-responsive max-w-[170px] md:max-w-[0px] lg:max-w-[300px] h-[100px] md:h-[150px] lg:h-[200px] inline m-2 md:m-2 lg:m-3 rounded-lg md:rounded-xl lg:rounded-2xl" src={singleImage} />
                        </a>)
                    }
                </LightGallery>
            </div>
        </div>
    );
};

export default MemoryDetails;21