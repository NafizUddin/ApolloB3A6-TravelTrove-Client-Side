"use client";

import { IPost } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import parse from "html-react-parser";
import { user } from "@nextui-org/theme";
import { useUser } from "@/src/context/user.provider";

const TravelPostCard = ({ singlePost }: any) => {
  const {
    title,
    category,
    description,
    image,
    postAuthor,
    upvote,
    downvote,
    status,
    createdAt,
    _id,
  } = singlePost;

  const [comment, setComment] = useState<string>("");
  const { user } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    setComment("");

    const commentData = {
      text: comment,
      user: user?._id,
      post: _id,
      email: user?.email,
    };

    console.log(commentData);
  };

  return (
    <div className="my-5">
      <article className="mb-4 break-inside p-4 md:p-6 rounded-xl bg-white flex flex-col bg-clip-border md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto border border-primary">
        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <a className="inline-block mr-4" href="#">
              <img
                className="rounded-full max-w-none w-12 h-12 object-cover"
                src={postAuthor?.profilePhoto}
              />
            </a>
            <div className="flex flex-col">
              <div>
                <a
                  className="inline-block text-lg font-bold dark:text-white"
                  href="#"
                >
                  {postAuthor?.name}
                </a>
              </div>
              <div className="text-slate-500">July 17, 2018</div>
            </div>
            <div className="ml-3 md:ml-4">
              <span className="rounded-full bg-primary px-3 py-1 text-white text-sm flex gap-2 items-center cursor-pointer hover:bg-primary-700">
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
            </div>
          </div>
          <div>
            <span className="rounded-full border border-primary px-3 py-2  text-primary font-semibold hidden md:block mb-2">
              {category}
            </span>
          </div>
        </div>
        <div className="mt-2 mb-6 md:mb-0 md:mt-0">
          <span className="rounded-full border border-primary px-3 py-2  text-primary font-semibold md:hidden mb-2">
            {category}
          </span>
        </div>
        <h2 className="text-3xl font-extrabold">{title}</h2>
        <div className="py-4">
          <div className="flex justify-between gap-1">
            <a className="flex w-full" href="#">
              <img
                className="rounded-br-lg object-cover w-full h-[450px]"
                src={image}
              />
            </a>
          </div>
        </div>
        <div className="">{parse(description)}</div>
        <div className="py-4 flex gap-5">
          <a className="inline-flex items-center" href="#">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-thumbs-up text-primary"
              >
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
            </span>
            <span className="text-lg font-bold">{upvote}</span>
          </a>
          <a className="inline-flex items-center" href="#">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-thumbs-down text-primary"
              >
                <path d="M17 14V2" />
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
              </svg>
            </span>
            <span className="text-lg font-bold">{downvote}</span>
          </a>
          <a className="inline-flex items-center" href="#">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle text-primary"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </span>
            <span className="text-lg font-bold">34</span>
          </a>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Write a comment"
            variant="bordered"
            size="lg"
            className="border-primary focus:ring-primary"
            value={comment} // Bind the value to the state
            onChange={handleInputChange} // Handle input change
            endContent={
              <svg
                className="fill-blue-500 size-8"
                onClick={handleCommentSubmit} // Handle submission when the icon is clicked
                viewBox="0 0 24 24"
                style={{ width: 24, height: 24 }}
              >
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
              </svg>
            }
          />
        </div>

        <div className="pt-6">
          <div className="media flex pb-4">
            <a className="mr-4" href="#">
              <img
                className="rounded-full max-w-none w-12 h-12"
                src="https://randomuser.me/api/portraits/men/82.jpg"
              />
            </a>
            <div className="media-body">
              <div>
                <a className="inline-block text-base font-bold mr-2" href="#">
                  Leslie Alexander
                </a>
                <span className="text-slate-500 dark:text-slate-300">
                  25 minutes ago
                </span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur.</p>
              <div className="mt-2 flex items-center">
                <a className="inline-flex items-center py-2 mr-3" href="#">
                  <span className="mr-2">
                    <svg
                      className="fill-rose-600 dark:fill-rose-400"
                      //   style="width: 22px; height: 22px;"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
                    </svg>
                  </span>
                  <span className="text-base font-bold">12</span>
                </a>
                <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  Reply
                </button>
              </div>
            </div>
          </div>

          <div className="media flex pb-4">
            <a className="inline-block mr-4" href="#">
              <img
                className="rounded-full max-w-none w-12 h-12"
                src="https://randomuser.me/api/portraits/women/76.jpg"
              />
            </a>
            <div className="media-body">
              <div>
                <a className="inline-block text-base font-bold mr-2" href="#">
                  Tina Mills
                </a>
                <span className="text-slate-500 dark:text-slate-300">
                  3 minutes ago
                </span>
              </div>
              <p>Dolor sit ameteiusmod consectetur adipiscing elit.</p>
              <div className="mt-2 flex items-center">
                <a className="inline-flex items-center py-2 mr-3" href="#">
                  <span className="mr-2">
                    <svg
                      className="fill-rose-600 dark:fill-rose-400"
                      //   style="width: 22px; height: 22px;"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path>
                    </svg>
                  </span>
                  <span className="text-base font-bold">0</span>
                </a>
                <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  Repply
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <a
              href="#"
              className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
            >
              Show more comments
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TravelPostCard;
