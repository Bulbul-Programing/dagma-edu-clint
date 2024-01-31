import CreatePost from "./CreatePost/CreatePost";
import ForumBanner from "./ForumBanner/ForumBanner";

const Forum = () => {
    return (
        <div>
            <ForumBanner></ForumBanner>
            <div className="md:w-[700px] lg:w-[700px] mx-auto">
                <CreatePost></CreatePost>
            </div>
        </div>
    );
};

export default Forum;