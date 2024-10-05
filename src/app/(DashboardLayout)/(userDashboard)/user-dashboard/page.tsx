"use client";
import LoadingCard from "@/src/components/ui/section/LoadingCard";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import TravelPostCard from "@/src/components/ui/section/TravelPostCard";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPostsInDashboard } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

const UserDashboardHome = () => {
  const { user } = useUser();

  const {
    data: individualAllPosts,
    refetch,
    isFetching,
  } = useGetAllPostsInDashboard(`postAuthor=${user?._id}`);

  console.log(individualAllPosts?.data, isFetching);

  return (
    <div>
      <SectionTitle sub="TIPS & STORIES" heading="MY TRAVEL INSIGHTS" />

      <div className="mt-8">
        <div>
          {individualAllPosts?.data?.length > 0 ? (
            individualAllPosts?.data?.map(
              (singlePost: IPost, index: number) => (
                <div key={index}>
                  <TravelPostCard singlePost={singlePost} />
                </div>
              )
            )
          ) : (
            <LoadingCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
