"use client";
import FollowersLoadingCard from "@/src/app/(CommonLayout)/(home)/_components/section/FollowersLoadingCard";
import FollowingCard from "@/src/components/dashboard/FollowingCard";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";

const FollowingPage = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="py-10">
      <div className="space-y-3 mt-12 lg:mt-0">
        <div className="border-t-4 w-[100px] border-backup" />
        <h1 className="text-3xl font-bold">
          Total Followings: {user?.following.length || 0}
        </h1>
      </div>

      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <FollowersLoadingCard key={index} />
            ))}
          </div>
        ) : user!.following.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {user!.following.map((singleUser: IUser, index: number) => (
              <FollowingCard key={index} singleUser={singleUser} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <div className="pt-14 lg:pt-24">
              <img
                src="https://i.postimg.cc/dt4RfL85/follow.png"
                className="w-52"
                alt="profile card"
              />
            </div>
            <p className="max-w-lg text-center text-3xl font-bold">
              You haven&apos;t followed anyone yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;
