import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';


const Header = () => {
    return (
        <div className="  bg-no-repeat md:mb-16 bg-fixed bg-center bg-auto  bg-[url('https://i.ibb.co/VVgHWbb/New-Project-8.jpg')] lg:mb-16">
            {/* <img className='z-0 lg:h-[600px] w-full' src="https://i.ibb.co/VVgHWbb/New-Project-8.jpg" alt="" /> */}
            <div className=" text-white w-full lg:pb-10 h-full bg-slate-700 bg-opacity-65">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                ><h1 className='text-2xl py-5 md:text-5xl lg:text-6xl font-bold text-white text-center md:py-10 lg:py-20'>Duaria A.G Model Academy</h1></motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                ><div className='lg:w-3/4 h-[150px] text-[10px] md:text-[14px] lg:text-[16px] mx-auto px-10'>
                        <TypeAnimation
                            sequence={[
                                'Discover a world of learning at Duaria A.G Model Academy. Welcome!',
                                1000,
                                'Our mission is to empower students with knowledge, skills, and values for a successful future.',
                                1000,
                                'Striving for excellence, our mission is to provide quality education that inspires lifelong learning.',
                                1000,
                                'Striving for excellence, our mission is to provide quality education that inspires lifelong learning.',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '2em', display: 'inline-block' }}
                            repeat={Infinity}
                        > </TypeAnimation>
                    </div></motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                ><div className='flex justify-center'>
                        <Link to='/academy'><button className='btn mt-7 md:mt-0 lg:mt-0 bg-blue-500 border-none text-white font-bold hover:bg-blue-400'>Explore Academy</button></Link>
                    </div></motion.div>
            </div>
            <img className=' bottom-0 z-10 lg:h-[150px] lg:w-full bg-slate-700 bg-opacity-65' src="https://i.ibb.co/jb8wQBD/New-Project-4.png" alt="" />
        </div>
    );
};

export default Header;