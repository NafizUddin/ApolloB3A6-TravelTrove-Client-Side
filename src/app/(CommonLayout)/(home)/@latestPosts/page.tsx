import SectionTitle from "@/src/components/ui/section/SectionTitle";
import TravelPostCard from "@/src/components/ui/section/TravelPostCard";
import { getAllPostsHomePage } from "@/src/services/PostServices";
import { IPost } from "@/src/types";

const LatestPosts = async () => {
  const { data } = await getAllPostsHomePage();

  return (
    <div className="my-16">
      <SectionTitle sub="TIPS & STORIES" heading="LATEST TRAVEL INSIGHTS" />

      <div className="my-10">
        {data?.result &&
          data?.result?.map((singlePost: IPost, index: number) => (
            <TravelPostCard key={index} singlePost={singlePost} />
          ))}
      </div>
    </div>
  );
};

export default LatestPosts;
