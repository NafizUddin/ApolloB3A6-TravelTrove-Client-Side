"use client";

import LoadingCard from "@/src/app/(CommonLayout)/(home)/_components/section/LoadingCard";
import SectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/SectionTitle";
import TravelCardDashboard from "@/src/app/(CommonLayout)/(home)/_components/section/TravelCardDashboard";
import { useGetAllPostsInDashboard } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

const PostManagement = () => {
  const {
    data: AllPosts,
    refetch,
    isLoading: postLoading,
  } = useGetAllPostsInDashboard();

  return (
    <div>
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Travel Content Management"
      />

      <div className="mt-8">
        <div>
          {AllPosts?.data?.length > 0 ? (
            postLoading ? (
              <LoadingCard />
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {AllPosts?.data?.map((singlePost: IPost, index: number) => (
                  <div key={index}>
                    <TravelCardDashboard singlePost={singlePost} />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="pt-14 lg:pt-24">
                <img
                  src="https://i.postimg.cc/MTdMr9TP/post.png"
                  className="w-52"
                />
              </div>
              <p className="max-w-lg text-center text-3xl font-bold mt-6">
                No posts available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
