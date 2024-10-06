"use client";
import { useUser } from "@/src/context/user.provider";

const Followers = () => {
  const { user } = useUser();

  console.log(user?.followers);

  return (
    <div className="py-5">
      <div className="space-y-3">
        <div className="border-t-4 w-[80px] border-backup" />
        <h1 className="text-3xl font-bold">Total Followers: 0</h1>
      </div>
    </div>
  );
};

export default Followers;
