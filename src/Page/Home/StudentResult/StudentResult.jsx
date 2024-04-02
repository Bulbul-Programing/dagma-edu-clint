import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';


const StudentResult = () => {
    const axiosPublic = useAxiosPublic()

    const { data: allResult, isLoading } = useQuery({
        queryKey: ['getAllResult'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all/result')
            return res.data
        }
    })

    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

    if (isLoading) {
        <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }
    const data = [
        { name: 'Passed', value:  allResult ? parseInt( allResult[0]?.passed) : 0, gpa : 5 },
        { name: 'A+', value: allResult ? parseInt( allResult[0]?.aPlus) : 0},
        { name: 'Failed', value: allResult ? parseInt( allResult[0]?.failed) : 10 },
    ];
   
    return (
        <div className='my-5 md:my-5 lg:my-10'>
            <h1 className='text-2xl md:text-3xl lg:text-3xl font-bold text-center'>Our Student Result analyze</h1>
            <div className='flex justify-between flex-col md:flex-row lg:flex-row m-10 gap-y-5 gap-x-10'>
                <div className='w-full flex justify-center items-center md:w-1/2 lg:w-1/2'>
                    <motion.div
                        className="card"
                        initial={{
                            opacity: 0,
                            // if odd index card,slide from right instead of left
                            y: -50
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0, // Slide in to its original position
                            transition: {
                                duration: 1 // Animation duration
                            }
                        }}
                        viewport={{ once: false }}
                    >
                        <div>
                            <img className='w-full rounded-lg' src="https://i.ibb.co/1LWHQ6Q/11879373-Success.jpg" alt="" />
                        </div>
                    </motion.div>
                </div>
                <div className='w-full flex justify-center md:w-1/2 lg:w-1/2'>
                    <motion.div
                        className="card"
                        initial={{
                            opacity: 0,
                            // if odd index card,slide from right instead of left
                            y: -50
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0, // Slide in to its original position
                            transition: {
                                duration: 1 // Animation duration
                            }
                        }}
                        viewport={{ once: false }}
                    >
                        <div>
                            <h1 className='text-center text-2xl font-bold'>{ allResult ? allResult[0]?.title : 'loading...'}</h1>
                            <p className='text-center font-medium'>Total participant <span className='text-xl'>{ allResult ? allResult[0]?.participant : 'loading...'}</span></p>
                        </div>
                        <PieChart width={390} height={310}>
                            <Pie
                                data={data}
                                cx={200}
                                cy={150}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </motion.div>
                </div>
            </div>
            <div className='flex justify-center'>
                <Link to='/academy' className='bg-blue-500 text-lg hover:bg-blue-600 hover:scale-105 hover:delay-75 font-medium px-4 py-2 rounded-lg text-white'>Show all result</Link>
            </div>
        </div>
    );
};

export default StudentResult;