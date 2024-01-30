import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaRegBuilding } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { FaAward } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";



const Achievements = () => {
    const [startCount, setStartCount] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('animated-number')
            if (element && isElementInViewport(element)) {
                setStartCount(true)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }


    return (
        <div className='bg-cover my-20 bg-center bg-fixed bg-[url("https://i.ibb.co/2vy59D6/New-Project.jpg")]'>
            <div className='px-10 py-20 text-white bg-slate-800 bg-opacity-80'>
                <h1 className="md:text-2xl lg:text-4xl font-bold text-center">OUR TEACHERS AND STUDENTS ACHIEVEMENTS</h1>
                <div className=' mt-10 md:mt-20 lg:mt-20 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-4 justify-between lg:mx-20 lg:gap-x-10 text-center'>
                    <div id='animated-number' className='flex flex-col justify-center items-center'>
                        {startCount && <div className='flex gap-x-3 items-center'><FaRegBuilding className='text-4xl'></FaRegBuilding><CountUp className='text-4xl font-bold' start={0} end={1961} duration={2.5} separator=","></CountUp></div>}
                        <h1 className='text-lg font-medium mt-3'>YEAR FOUNDED</h1>
                    </div>
                    <div id='animated-number' className='flex flex-col justify-center items-center'>
                        {startCount && <div className='flex gap-x-3 items-center'> <GiTeacher className='text-4xl'></GiTeacher> <CountUp className='text-4xl font-bold' start={0} end={45} duration={6} separator=","></CountUp></div>}
                        <h1 className='text-lg font-medium mt-3'>CERTIFIED TEACHERS</h1>
                    </div>
                    <div id='animated-number' className='flex flex-col justify-center items-center'>
                        {startCount && <div className='flex gap-x-3 items-center'><FaGraduationCap className='text-4xl'></FaGraduationCap> <CountUp className='text-4xl font-bold' start={0} end={10445} duration={5.5} separator=","></CountUp></div>}
                        <h1 className='text-lg font-medium mt-3'>PASSED STUDENTS</h1>
                    </div>
                    <div id='animated-number' className='flex flex-col justify-center items-center'>
                        {startCount && <div className='flex gap-x-3 items-center'><FaAward className='text-4xl'></FaAward> <CountUp className='text-4xl font-bold' start={0} end={139} duration={2.5} separator=","></CountUp></div>}
                        <h1 className='text-lg font-medium mt-3'>AWARDS WINNER</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievements;