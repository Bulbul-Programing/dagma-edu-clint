import { useState } from "react";

const Results = () => {
    const [section, setSection] = useState('SSC')

    const handleResult = (section) => {
        setSection(section)
    }
    return (
        <div>
            <div>
                <button onClick={() => handleResult('SSC')} className={`px-6 py-3 rounded-lg ml-3 ${section === 'SSC' ? 'bg-blue-500' : 'bg-slate-400'} font-medium text-lg  text-white hover:text-black`}>SSC</button>
                <button onClick={() => handleResult('HSC')} className={`px-6 py-3 rounded-lg ml-3 ${section === 'HSC' ? 'bg-blue-500' : 'bg-slate-400'} font-medium text-lg  text-white hover:text-black`}>HSC</button>
            </div>
            <div>
                <h1 className="text-xl md:text-2xl my-4 lg:text-3xl font-semibold text-center">{section} Result Analyze</h1>
            </div>
        </div>
    );
};

export default Results;