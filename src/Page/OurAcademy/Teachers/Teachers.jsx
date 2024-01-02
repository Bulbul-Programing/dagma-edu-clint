import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";

const Teachers = () => {
    const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
    const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
    const axiosPublic = useAxiosPublic()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)

        const imageURL = res.data.data.display_url

        const name = data.name
        const subject = data.subject
        const number = data.number
        const photo = imageURL
        const teacherProfile = { name, subject,number, photo }
        console.log(teacherProfile);
    }

    return (
        <div className="m-10">
            <div className="my-5 md:my-10 lg:my-10">
                <button className="btn bg-blue-400 ml-3 text-white font-bold hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Teacher</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {errors.name && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="text" placeholder="Teacher Name" {...register("name", { require: true })} required /> <br />
                            {errors.subject && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="text" placeholder="What subject does he teach?" {...register("subject", { require: true })} required /> <br />
                            {errors.number && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500 file-input file-input-bordered" type="number" placeholder="Phone Number" {...register("number", { require: true })} required /> <br />
                            {errors.image && <span className="text-red-400">This field is required</span>}
                            <input className="px-4 w-full mb-6 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" type="file" {...register("image", { require: true })} required /> <br />
                            <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Add Teacher" />
                        </form>
                        <div className="modal-action ">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full text-white bg-red-500">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="shadow-2xl p-5 text-center space-y-1 rounded-2xl ">
                    <img className="w-[100px] h-[100px] md:w-[150px] lg:w-[200px] md:h-[150px] lg:h-[200px] mx-auto rounded-full" src="https://i.ibb.co/mTr7zST/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash.jpg" alt="" />
                    <h1 className="text-xl font-bold">Md. Proshanto Roy</h1>
                    <p className="text-slate-600 font-medium">Lecturer in ICT</p>
                    <p className="text-slate-600 font-medium">01728457040</p>
                </div>
                <div className="shadow-2xl p-5 text-center space-y-1 rounded-2xl ">
                    <img className="w-[100px] h-[100px] md:w-[150px] lg:w-[200px] md:h-[150px] lg:h-[200px] mx-auto rounded-full" src="https://i.ibb.co/mTr7zST/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash.jpg" alt="" />
                    <h1 className="text-xl font-bold">Md. Proshanto Roy</h1>
                    <p className="text-slate-600 font-medium">Lecturer in ICT</p>
                    <p className="text-slate-600 font-medium">01728457040</p>
                </div>
                <div className="shadow-2xl p-5 text-center space-y-1 rounded-2xl ">
                    <img className="w-[100px] h-[100px] md:w-[150px] lg:w-[200px] md:h-[150px] lg:h-[200px] mx-auto rounded-full" src="https://i.ibb.co/mTr7zST/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash.jpg" alt="" />
                    <h1 className="text-xl font-bold">Md. Proshanto Roy</h1>
                    <p className="text-slate-600 font-medium">Lecturer in ICT</p>
                    <p className="text-slate-600 font-medium">01728457040</p>
                </div>
                <div className="shadow-2xl p-5 text-center space-y-1 rounded-2xl ">
                    <img className="w-[100px] h-[100px] md:w-[150px] lg:w-[200px] md:h-[150px] lg:h-[200px] mx-auto rounded-full" src="https://i.ibb.co/mTr7zST/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash.jpg" alt="" />
                    <h1 className="text-xl font-bold">Md. Proshanto Roy</h1>
                    <p className="text-slate-600 font-medium">Lecturer in ICT</p>
                    <p className="text-slate-600 font-medium">01728457040</p>
                </div>
            </div>
        </div>

    );
};

export default Teachers;