/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";
import FollowersLoadingCard from "@/src/app/(CommonLayout)/(home)/_components/section/FollowersLoadingCard";
import FollowersCard from "@/src/components/dashboard/FollowersCard";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";

const Followers = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="py-5">
      <div className="space-y-3 mt-12 lg:mt-0">
        <div className="border-t-4 w-[100px] border-backup" />
        <h1 className="text-3xl font-bold">
          Total Followers: {user?.followers.length || 0}
        </h1>
      </div>

      {/* Card Part */}
      {/* <div>
        {user?.followers.length !== undefined && user?.followers.length > 0 && (
          <div className="grid grid-cols-3 gap-5">
            {user.followers.map((singleUser: IUser, index: number) => (
              <FollowersCard
                key={index}
                singleUser={singleUser}
                allFollowings={user.following}
              />
            ))}
          </div>
        )}
      </div> */}

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
              <FollowersCard
                key={index}
                singleUser={singleUser}
                allFollowings={user!.following}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <div className="pt-14 lg:pt-24">
              <img
                src="https://i.postimg.cc/B6D7T1nn/social-media.png"
                className="w-52"
                alt="profile image"
              />
            </div>
            <p className="max-w-lg text-center text-3xl font-bold mt-6">
              You have no followers yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
