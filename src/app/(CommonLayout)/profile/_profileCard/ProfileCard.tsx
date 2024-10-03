"use client";
import { IUser } from "@/src/types";

export default function ProfileCard({ user }: { user: IUser }) {
  const {
    _id,
    name,
    role,
    email,
    status,
    profilePhoto,
    followers,
    following,
    totalUpvote,
    isVerified,
    postCount,
  } = user;

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="group relative  sm:w-[350px]">
        <img
          width={350}
          height={350}
          className="h-full w-full scale-105 transform rounded-lg bg-black/70"
          src={profilePhoto}
          alt="user photo"
        />
      </div>
      <div className="min-w-[250px] max-w-[450px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] md:w-[350px]">
        <div className="space-y-1">
          <h2 className="text-center text-2xl font-medium text-gray-700 dark:text-white/90 lg:text-3xl">
            {name}
          </h2>
          <p className="text-gray-500">{email}</p>
          <div className="py-2">
            <span className="rounded-full border-2 border-primary px-3 py-1 text-xs font-semibold text-primary">
              {status}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-white/70">Posts</p>
            <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">
              23
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-white/70">
              Following
            </p>
            <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">
              314
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-white/70">
              Followers
            </p>
            <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">
              487
            </p>
          </div>
        </div>
        <div>
          <button className="rounded-full border border-[#0d87f8] px-4 py-2 text-sm text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white  duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8]">
            EDIT PROFILE
          </button>
        </div>
      </div>
    </div>
  );
}
