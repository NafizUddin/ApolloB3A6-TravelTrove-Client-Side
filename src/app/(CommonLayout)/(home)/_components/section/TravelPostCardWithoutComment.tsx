/* eslint-disable jsx-a11y/img-redundant-alt */
"use client";

import parse from "html-react-parser";
import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hook";
import Link from "next/link";
import BlurOverlay from "./BlurOverlay";

const TravelPostCardWithoutComment = ({ singlePost }: any) => {
  const {
    title,
    category,
    description,
    image,
    postAuthor,
    createdAt,
    _id,
    status,
  } = singlePost;

  const { user } = useUser();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnfollowUser } = useUnfollowUser();

  const params = new URLSearchParams();
  const userParams = new URLSearchParams();
  params.set("id", _id);
  userParams.set("userId", postAuthor?._id);

  const handleAddFollow = (id: string, name: string) => {
    handleFollowUser({ id, name });
  };

  const handleRemoveFollow = (id: string, name: string) => {
    handleUnfollowUser({ id, name });
  };

  const isUserNotAvailableOrBasic =
    status === "PREMIUM" && (!user || (user && user.status === "BASIC"));

  return (
    <div className="my-5 relative">
      <div className="mb-4 break-inside p-4 md:p-6 rounded-xl bg-white flex flex-col bg-clip-border md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto border border-primary">
        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <Link
              href={
                postAuthor?._id !== user?._id
                  ? `/user-profile?${userParams.toString()}`
                  : "/profile"
              }
            >
              <div className="inline-block mr-4">
                <img
                  className="rounded-full max-w-none w-12 h-12 object-cover"
                  src={postAuthor?.profilePhoto}
                  alt="man image"
                />
              </div>
            </Link>
            <div className="flex flex-col">
              <Link
                href={
                  postAuthor?._id !== user?._id
                    ? `/user-profile?${userParams.toString()}`
                    : "/profile"
                }
              >
                <div>
                  <div className="inline-block text-lg font-bold">
                    {postAuthor?.name}
                  </div>
                </div>
              </Link>
              <div className="text-slate-500">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            {user && postAuthor?._id !== user?._id && (
              <div className="ml-3 md:ml-4">
                {postAuthor?.followers?.includes(user?._id) ? (
                  <span
                    onClick={() =>
                      handleRemoveFollow(postAuthor?._id, postAuthor?.name)
                    }
                    className="rounded-full bg-primary px-3 py-1 text-white text-sm flex gap-2 items-center cursor-pointer hover:bg-primary-700"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-x"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="17" x2="22" y1="8" y2="13" />
                        <line x1="22" x2="17" y1="8" y2="13" />
                      </svg>
                    </span>
                    <span className="md:block">Unfollow</span>
                  </span>
                ) : (
                  <span
                    onClick={() =>
                      handleAddFollow(postAuthor?._id, postAuthor?.name)
                    }
                    className="rounded-full bg-primary px-3 py-1 text-white text-sm flex gap-2 items-center cursor-pointer hover:bg-primary-700"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-plus"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                      </svg>
                    </span>
                    <span className="md:block">Follow</span>
                  </span>
                )}
              </div>
            )}
          </div>

          <span className="rounded-full border border-primary px-3 py-2  text-primary font-semibold hidden mb-2 md:flex justify-center items-center gap-1">
            {status === "PREMIUM" && (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#fcc200"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-crown"
                >
                  <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                  <path d="M5 21h14" />
                </svg>
              </span>
            )}
            <span>{category}</span>
          </span>
        </div>

        {/* category part for small device */}
        <div className="mt-2 mb-6 md:mb-0 md:mt-0">
          <div className="inline-flex rounded-full border border-primary px-3 py-2 text-primary font-semibold md:hidden mb-2 gap-1 w-auto">
            <div className="flex items-center">
              {status === "PREMIUM" && (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#fcc200"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-crown"
                  >
                    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                    <path d="M5 21h14" />
                  </svg>
                </span>
              )}
              <span>{category}</span>
            </div>
          </div>
        </div>

        {/* title part */}
        <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>

        {/* image part */}
        <div className="py-4">
          <div className="flex justify-between gap-1">
            <div className="flex w-full">
              <div className="overflow-hidden rounded-br-lg w-full h-[350px] md:h-[450px]">
                <img
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 rounded-md"
                  src={image}
                  alt="Description"
                />
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="">{parse(description)}</div>

        <Link href={`/postDetails?${params.toString()}`}>
          <div className="text-center my-4">
            <div
              className="relative inline-block text-lg font-medium text-blue-600 hover:text-blue-800
                   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 
                   after:bg-blue-600 after:w-full after:scale-x-0 hover:after:scale-x-100
                   after:transition-transform after:duration-300 after:ease-out after:origin-left"
            >
              Click here to see post details
            </div>
          </div>
        </Link>
      </div>
      {isUserNotAvailableOrBasic && <BlurOverlay />}
    </div>
  );
};

export default TravelPostCardWithoutComment;
