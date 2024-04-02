import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';


const Results = () => {
    const [section, setSection] = useState('JSC')
    const axiosPublic = useAxiosPublic()
    const [allResult, setAllResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalIndex, setModalIndex] = useState(0)

    const handleResult = (section) => {
        setSection(section)
        setModal(false)
    }

    useEffect(() => {
        const getResult = async () => {
            setLoading(true)
            await axiosPublic.get(`/section/result/${section}`)
                .then(res => setAllResult(res.data))
            setLoading(false)
        }
        getResult()
    }, [section])

    if (loading) {
        <div className="flex justify-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }
    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];
    const data = [
        { name: 'Passed', value: allResult ? parseInt(allResult[modalIndex]?.passed) : 0, },
        { name: 'A+', value: allResult ? parseInt(allResult[modalIndex]?.aPlus) : 0 },
        { name: 'Failed', value: allResult ? parseInt(allResult[modalIndex]?.failed) : 0 },
    ];

    const handleModalFalse = () => {
        setModal(false)
    }

    const handleModal = (index) => {
        setModal(true)
        setModalIndex(index);
    }

    return (
        <div className="relative">
            <div>
                <button onClick={() => handleResult('JSC')} className={`px-6 py-3 rounded-lg ml-3 ${section === 'JSC' ? 'bg-blue-500' : 'bg-slate-400'} font-medium text-lg  text-white hover:text-black`}>JSC</button>
                <button onClick={() => handleResult('SSC')} className={`px-6 py-3 rounded-lg ml-3 ${section === 'SSC' ? 'bg-blue-500' : 'bg-slate-400'} font-medium text-lg  text-white hover:text-black`}>SSC</button>
                <button onClick={() => handleResult('HSC')} className={`px-6 py-3 rounded-lg ml-3 ${section === 'HSC' ? 'bg-blue-500' : 'bg-slate-400'} font-medium text-lg  text-white hover:text-black`}>HSC</button>
            </div>
            <div>
                <h1 className="text-xl md:text-2xl my-4 lg:text-3xl font-semibold text-center">{section} Result Analyze</h1>
            </div>
            <div className="overflow-x-auto shadow-xl p-5 rounded-xl mx-2 md:mx-10 lg:mx-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="text-center border ">Date</th>
                            <th className="text-center border min-w-[200px]">Title</th>
                            <th className="text-center border ">Participant</th>
                            <th className="text-center border ">Got A+</th>
                            <th className="text-center border ">Passed</th>
                            <th className="text-center border ">Fail</th>
                            <th className="text-center border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allResult?.map((result, index) =>
                                <tr key={result._id} className="border py-0">

                                    <td className="w-[50px]">
                                        <h1 className="font-bold border-r">{result.date}</h1>
                                    </td>
                                    <td className="min-w-[200px]">
                                        <div className="flex items-center gap-x-5">
                                            <h1 className="font-bold">{result.title.length > 55 ? result.title.slice(0, 55) : result.title}{result.title.length > 55 ? '....' : ''}</h1>
                                        </div>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.participant}</h1>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.aPlus}</h1>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.passed}</h1>
                                    </td>
                                    <td className="">
                                        <h1 className="font-bold text-center">{result.failed}</h1>
                                    </td>

                                    <th className="min-w-[210px] p-0">
                                        <span className="flex justify-center">
                                            <button onClick={() => handleModal(index)} className="px-2 md:px-3 lg:px-3 py-2 rounded-md text-xs hover:bg-slate-300 bg-blue-500 mr-3 text-white hover:text-black">Chart View</button>
                                            {
                                                result.resultPic && <div className="px-3 py-2 rounded-md text-xs hover:bg-slate-300 bg-blue-500 mr-3 text-white hover:text-black"><a href={result.resultPic} target="_blank">download</a></div>
                                            }
                                        </span>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* modal */}
            <div className={`absolute w-[300px] md:w-[600px] lg:w-[700px] -top-24 shadow-2xl left-0 right-0 ml-auto mr-auto ${modal === true ? 'block' : 'hidden'} px-10 py-5 z-10 bg-slate-200 rounded-xl`}>
                <div>
                    <h1 className='text-center text-2xl font-bold'>{allResult ? allResult[modalIndex]?.title : 'loading...'}</h1>
                    <p className='text-center font-medium'>Total participant <span className='text-xl'>{allResult ? allResult[modalIndex]?.participant : 'loading...'}</span></p>
                </div>
                <div className="hidden md:block lg:block">
                    <div className=" flex items-center justify-center ">
                        <PieChart width={400} height={310}>
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
                    </div>
                </div>
                <div className=" block md:hidden lg:hidden items-center justify-center">
                    <div className=" flex text-left ">
                        <PieChart width={300} height={250}>
                            <Pie
                                data={data}
                                cx={160}
                                cy={80}
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
                    </div>
                </div>
                <button onClick={handleModalFalse} className="btn bg-red-500 text-white hover:text-black">Close</button>
            </div>
        </div>
    );
};

export default Results;