import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';


const Header = () => {
    return (
        <div className="relative mb-20 md:mb-16 lg:mb-16">
            <img className='z-0 lg:h-[600px] w-full' src="https://i.ibb.co/VVgHWbb/New-Project-8.jpg" alt="" />
            <div className="absolute text-white w-full top-0 z-10 h-full bg-slate-700 bg-opacity-65">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                ><h1 className='text-2xl my-5 md:text-5xl lg:text-6xl font-bold text-white text-center md:my-10 lg:my-20'>Duaria A.G Model Academy</h1></motion.div>
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
            <img className="absolute z-20 wave bottom-0 h-[30px] lg:h-[60px] w-full" src="https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYR7egYAsmIqc87WgNw8NP1eLtaRgedntwoLvrbIb4WXrGK-ePo9pBkxlg2OpWfCnykok35ZluEcE0zCs64uowCzAi-2=w1280-h833" alt="" />
        </div>
    );
};

export default Header;