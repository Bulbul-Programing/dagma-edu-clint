import { motion } from 'framer-motion';

const PrincipalTalk = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row lg:flex-row items-center m-5 md:m-10 lg:m-20 justify-between">
            <div className='md:w-4/6 mr-4 lg:w-1/2'>
                <motion.div
                    className="card"
                    initial={{
                        opacity: 0,
                        // if odd index card,slide from right instead of left
                        x: -50
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0, // Slide in to its original position
                        transition: {
                            duration: 1 // Animation duration
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div>
                        <p className="my-2 text-slate-500">Principal Talk</p>
                        <h1 className="text-2xl my-3 font-bold">EDUCATION IS THE MOST POWERFUL WEAPON</h1>
                        <p className="text-slate-500 my-5">Our students are talented, hard-working and full of good ideas. We encourage and empower them to bring their ideas to life. Hands-on opportunities are what we are all about. Our students are busy doing things that matter. Take a look at the opportunities you will have at the Collage. The task of the modern educator is not to cut down jungles, but to irrigate deserts.</p>
                        <img className="mb-3 mt-10" src="https://i.ibb.co/d2zy7mh/signature.png" alt="" />
                        <p className="font-bold text-lg">Abu Salim Bhuiya</p>
                        <p className="text-slate-500">Principal DAGMA</p>
                    </div></motion.div>
            </div>
            <div className='md:2/6 lg:w-1/2'>
                <motion.div
                    className="card"
                    initial={{
                        opacity: 0,
                        // if odd index card,slide from right instead of left
                        x: 50
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0, // Slide in to its original position
                        transition: {
                            duration: 1 // Animation duration
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div className="flex md:justify-end lg:justify-center">
                        <img className=" w-[250px] md:w-[250px] lg:w-[300px] mask mask-hexagon" src="https://i.ibb.co/SQQB6x0/New-Project-8.jpg" alt="" />
                    </div></motion.div>
            </div>
        </div>
    );
};

export default PrincipalTalk;