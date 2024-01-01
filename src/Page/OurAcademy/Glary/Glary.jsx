import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { useState } from "react";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Glary = () => {
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        const uploadPromises = images.map(async (image) => {
            const formData = new FormData();
            formData.append('image', image);

            try {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=e81c07b7b12d825ec8a0650fb4781041`, formData);
                setUploadedImages((prevImages) => [...prevImages, response.data.data.url]);
                setLoading(false)
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        });
        await Promise.all(uploadPromises);

        console.log(object);
    };

    if (images.length === uploadedImages.length) {
        console.log(uploadedImages);
    }

    //todo: if user role is teacher then he add memory

    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };

    return (
        <div className="mx-5 md:mx-10 lg:mx-20">
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Memory</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleUpload}>
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Memory Title" /> <br />
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" onChange={handleImageChange} type="file" multiple />
                            <div>
                                {
                                    loading ? <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' disabled type="submit" value="ADD" /> : <input className='btn bg-blue-500 w-full text-center text-white hover:text-black' type="submit" value="ADD" />
                                }
                            </div>
                        </form>
                        <div className="modal-action ">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full text-white bg-red-500">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div >
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom,]}
                    elementClassNames="custom-wrapper-class"
                    onBeforeSlide={onBeforeSlide}
                    mode="lg-fade"
                >
                    <a data-lg-size="1406-1390"
                        className="gallery-item " download={true} href="https://i.ibb.co/F8wYXdF/IMG20230820173126.jpg">
                        <img className="img-responsive max-w-[600px] md:max-w-[330px] lg:max-w-[400px] h-[130px] md:h-[185px] lg:h-[260px] inline m-2 rounded-lg md:rounded-xl lg:rounded-2xl" src="https://i.ibb.co/F8wYXdF/IMG20230820173126.jpg" />
                    </a>
                    <a data-lg-size="1406-1390"
                        className="gallery-item " href="https://i.ibb.co/nD2kxVQ/IMG-20230224-162543.jpg">
                        <img className="img-responsive max-w-[600px] md:max-w-[330px] lg:max-w-[400px] h-[130px] md:h-[185px] lg:h-[260px] inline m-2 rounded-lg md:rounded-xl lg:rounded-2xl" src="https://i.ibb.co/nD2kxVQ/IMG-20230224-162543.jpg" />
                    </a>
                    <a data-lg-size="1406-1390"
                        className="gallery-item " href="https://i.ibb.co/RCsdGKF/Firefly-20231229145123-1.png">
                        <img className="img-responsive max-w-[600px] md:max-w-[330px] lg:max-w-[400px] h-[130px] md:h-[185px] lg:h-[260px] inline m-2 rounded-lg md:rounded-xl lg:rounded-2xl" src="https://i.ibb.co/RCsdGKF/Firefly-20231229145123-1.png" />
                    </a>
                    <a data-lg-size="1406-1390"
                        className="gallery-item " href="https://i.ibb.co/RCsdGKF/Firefly-20231229145123-1.png">
                        <img className="img-responsive max-w-[600px] md:max-w-[330px] lg:max-w-[400px] h-[130px] md:h-[185px] lg:h-[260px] inline m-2 rounded-lg md:rounded-xl lg:rounded-2xl" src="https://i.ibb.co/RCsdGKF/Firefly-20231229145123-1.png" />
                    </a>
                    <a data-lg-size="1406-1390"
                        className="gallery-item " href="https://i.ibb.co/RCsdGKF/Firefly-20231229145123-1.png">
                        <img className="img-responsive max-w-[600px] md:max-w-[330px] lg:max-w-[400px] h-[130px] md:h-[185px] lg:h-[260px] inline m-2 rounded-lg md:rounded-xl lg:rounded-2xl" src="https://i.ibb.co/RCsdGKF/Firefly-20231229145123-1.png" />
                    </a>

                </LightGallery>
            </div>
        </div>
    );
};

export default Glary;