import PostCard from "@/src/components/ui/section/PostCard";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import TestPostCard from "@/src/components/ui/section/TestPostCard";
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
            <TestPostCard key={index} singlePost={singlePost} />
          ))}
        {/* <PostCard /> */}
      </div>
    </div>
  );
};

export default LatestPosts;
