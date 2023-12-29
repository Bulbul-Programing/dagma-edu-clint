import Achievements from "../../../Component/Achievements/Achievements";
import Header from "../../../Component/Header/Header";
import PrincipalTalk from "../../../Component/PrincipalTalk/PrincipalTalk";
import StudentFuture from "../../../Component/StudentFuture/StudentFuture";
import Notice from "../Notice/Notice";
// import Banner from "./Banner/Banner";

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Notice></Notice>
            <PrincipalTalk></PrincipalTalk>
            <StudentFuture></StudentFuture>
            <Achievements></Achievements>
            {/* <Banner></Banner> */}
        </div>
    );
};

export default Home;