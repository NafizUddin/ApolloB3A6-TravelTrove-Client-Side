"use client";
import FollowersCard from "@/src/components/dashboard/FollowersCard";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";

const Followers = () => {
  const { user } = useUser();

  return (
    <div className="py-5">
      <div className="space-y-3">
        <div className="border-t-4 w-[210px] border-backup" />
        <h1 className="text-3xl font-bold">
          Total Followers: {user?.followers.length || 0}
        </h1>
      </div>

      {/* Card Part */}
      <div>
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
      </div>
    </div>
  );
};

export default Followers;
