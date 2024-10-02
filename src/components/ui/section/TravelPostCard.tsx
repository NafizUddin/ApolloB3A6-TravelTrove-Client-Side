"use client";

import { IComment, IPost } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import parse from "html-react-parser";
import { useUser } from "@/src/context/user.provider";
import {
  useCreateComment,
  useDeleteComment,
  useGetPostAllComments,
  useUpdateComment,
} from "@/src/hooks/comment.hook";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteModal } from "../../modal/DeleteModal";

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
  const { mutate: handleCreateComment } = useCreateComment();
  const { mutate: handleCommentUpdate } = useUpdateComment();
  const { mutate: handleCommentDelete } = useDeleteComment();
  const { data: allComments, isLoading: commentLoading } =
    useGetPostAllComments(_id);

  const [isEditing, setIsEditing] = useState<string | null>("");
  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});
  const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleEdit = (id: string, text: string) => {
    setIsEditing(id);
    setEditedComments((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  // Handle input change
  const handleEditCommentChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedComments((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleCommentSubmit = () => {
    setComment("");

    const commentData: IComment = {
      text: comment,
      user: user?._id as string,
      post: _id,
      email: user?.email as string,
    };

    try {
      handleCreateComment(commentData);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleUpdateComment = (commentId: string) => {
    const updatedComment = editedComments[commentId];

    const newComment = {
      text: updatedComment,
    };

    try {
      handleCommentUpdate({ id: commentId, updatedComment: newComment });
      setIsEditing(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = () => {
    if (commentIdToDelete) {
      handleCommentDelete({ id: commentIdToDelete });
    }
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
            <span className="text-lg font-bold">
              {allComments?.data?.result?.length || 0}
            </span>
          </a>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Write a comment"
            variant="bordered"
            size="lg"
            className="border-primary focus:ring-primary"
            value={comment}
            onChange={handleInputChange}
            endContent={
              <svg
                className="fill-blue-500 size-8 cursor-pointer"
                onClick={handleCommentSubmit}
                viewBox="0 0 24 24"
                style={{ width: 24, height: 24 }}
              >
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
              </svg>
            }
          />
        </div>

        {commentIdToDelete && (
          <DeleteModal
            handleDeleteComment={handleDeleteComment}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}

        <div>
          {allComments?.data?.result?.length > 0 && (
            <div className="pt-6">
              {allComments.data.result.map((comment: any) => {
                return (
                  <div key={comment._id} className="media flex pb-4">
                    <a className="mr-4" href="#">
                      <img
                        className="rounded-full max-w-none w-12 h-12 object-cover"
                        src={comment.user?.profilePhoto}
                        alt={comment.user?.name}
                      />
                    </a>
                    <div className="flex justify-between items-center gap-7 w-full">
                      <div className="w-full">
                        {/* increase the width of this div */}
                        <div className="w-full">
                          <a
                            className="inline-block text-base font-bold mr-2"
                            href="#"
                          >
                            {comment.user?.name}
                          </a>
                          <span className="text-slate-500 dark:text-slate-300">
                            {/* Replace with actual comment time */}
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          {comment?.user?._id === user?._id &&
                          comment._id === isEditing ? (
                            <div className="flex gap-3">
                              <div className="relative w-full">
                                <Input
                                  type="text"
                                  placeholder="Write a comment"
                                  variant="bordered"
                                  size="md"
                                  className="border-primary focus:ring-primary"
                                  value={
                                    editedComments[comment._id] !== undefined
                                      ? editedComments[comment._id]
                                      : comment.text
                                  }
                                  onChange={(e) =>
                                    handleEditCommentChange(comment._id, e)
                                  }
                                  endContent={
                                    <svg
                                      className="fill-blue-500 size-8 cursor-pointer"
                                      onClick={() =>
                                        handleUpdateComment(comment._id)
                                      }
                                      viewBox="0 0 24 24"
                                      style={{ width: 24, height: 24 }}
                                    >
                                      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                                    </svg>
                                  }
                                />
                              </div>
                              <button
                                onClick={handleCancel}
                                className="rounded-md border border-rose-600 py-[3px] px-2 text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <p>{comment.text}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        {comment?.user?._id === user?._id && (
                          <div className="flex gap-3 mr-2">
                            <Tooltip showArrow={true} content="Edit Comment">
                              <div
                                onClick={() =>
                                  handleEdit(comment._id, comment.text)
                                }
                                className="bg-blue-500 p-1 rounded-full w-8 h-8 flex items-center justify-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-pencil"
                                >
                                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                              </div>
                            </Tooltip>

                            <Tooltip showArrow={true} content="Delete Comment">
                              <div
                                onClick={() => {
                                  setCommentIdToDelete(comment._id);
                                  setOpenModal(true);
                                }}
                                className="bg-blue-500 p-1 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-trash-2"
                                >
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                  <line x1="10" x2="10" y1="11" y2="17" />
                                  <line x1="14" x2="14" y1="11" y2="17" />
                                </svg>
                              </div>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-full">
                <a
                  href="#"
                  className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
                >
                  Show more comments
                </a>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default TravelPostCard;
