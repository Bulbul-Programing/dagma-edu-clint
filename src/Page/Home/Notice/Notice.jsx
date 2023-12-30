import Marquee from "react-fast-marquee";

const Notice = () => {
    return (
        <div className="bg-slate-200 my-5 mx-10 rounded-lg flex">
            <button className="btn  bg-blue-400 hover:text-slate-600 text-white font-bold">All Notice</button>
            <Marquee>
               <h1 className="text-lg">দুয়ারিয়া এ.জি মডেল একাডেমি</h1>
            </Marquee>
        </div>
    );
};

export default Notice;