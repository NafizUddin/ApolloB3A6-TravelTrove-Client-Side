/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";
import LoadingCardDashboard from "@/src/app/(CommonLayout)/(home)/_components/section/LoadingCardDashboard";
import SectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/SectionTitle";
import TravelCardDashboard from "@/src/app/(CommonLayout)/(home)/_components/section/TravelCardDashboard";
import { useUser } from "@/src/context/user.provider";
import { useGetAllPostsInDashboard } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

const UserDashboardHome = () => {
  const { user, isLoading: userLoading } = useUser();

  const {
    data: individualAllPosts,
    refetch,
    isLoading: postLoading,
  } = useGetAllPostsInDashboard(`postAuthor=${user?._id}`);

  return (
    <div className="py-10">
      <SectionTitle sub="TIPS & STORIES" heading="MY TRAVEL INSIGHTS" />

      <div className="mt-8">
        <div>
          {individualAllPosts?.data?.length > 0 ? (
            postLoading || userLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <LoadingCardDashboard key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {individualAllPosts?.data?.map(
                  (singlePost: IPost, index: number) => (
                    <div key={index}>
                      <TravelCardDashboard
                        singlePost={singlePost}
                        refetch={refetch}
                      />
                    </div>
                  )
                )}
              </div>
            )
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="pt-14 lg:pt-24">
                <img
                  src="https://i.postimg.cc/MTdMr9TP/post.png"
                  className="w-52"
                  alt="profile image"
                />
              </div>
              <p className="max-w-lg text-center text-3xl font-bold mt-6 mx-auto">
                You have not posted any post yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
