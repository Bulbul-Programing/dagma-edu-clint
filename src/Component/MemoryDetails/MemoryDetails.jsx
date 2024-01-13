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


    if(isLoading) {
        <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div className={`bg-[url('https://i.ibb.co/K2JXFDp/New-Project.jpg')] bg-center bg-no-repeat`}>
                <h1 className="text-2xl bg-slate-700 bg-opacity-65 text-white md:text-3xl lg:text-4xl font-bold text-center py-5 md:py-10 lg:py-20">{memoryData?.title}</h1>
            </div>
            <div className="m-5 md:m-5 lg:m-10">
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
                                <img className="img-responsive max-w-[170px] md:max-w-[200px] lg:max-w-[300px] h-[100px] md:h-[150px] lg:h-[200px] inline m-2 md:m-2 lg:m-3 rounded-lg md:rounded-xl lg:rounded-2xl" src={singleImage} />
                            </a>)
                    }
                </LightGallery>
            </div>
        </div>
    );
};

export default MemoryDetails; 21