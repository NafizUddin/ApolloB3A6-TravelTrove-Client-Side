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

  console.log(user);

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
              {status} PLAN
            </span>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <span className="underline font-medium">GET VERIFIED</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#1773aa"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-badge-check"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Posts</p>
            <p className="text-2xl tracking-wider text-gray-700 lg:text-3xl">
              {postCount}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Following</p>
            <p className="text-2xl tracking-wider text-gray-700 lg:text-3xl">
              {following?.length || 0}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Followers</p>
            <p className="text-2xl tracking-wider text-gray-700 lg:text-3xl">
              {followers?.length || 0}
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
