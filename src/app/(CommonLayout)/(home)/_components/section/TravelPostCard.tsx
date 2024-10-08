/* eslint-disable react/self-closing-comp */
"use client";

import { IComment, IPost } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useRef, useState } from "react";
import parse from "html-react-parser";
import { useUser } from "@/src/context/user.provider";
import {
  useCreateComment,
  useDeleteComment,
  useGetPostAllComments,
  useUpdateComment,
} from "@/src/hooks/comment.hook";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteModal } from "../../../../../components/modal/DeleteCommentModal/DeleteModal";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hook";
import {
  useAddDownvotePost,
  useAddUpvotePost,
  useRemoveDownvotePost,
  useRemoveUpvotePost,
  useUpdatePost,
} from "@/src/hooks/post.hook";
import Link from "next/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import UpdatePostModal from "@/src/components/modal/UpdatePostModal/UpdatePostModal";
import toast from "react-hot-toast";
import { DeletePostModal } from "@/src/components/modal/DeletePostModal/DeletePostModal";
import { deletePost } from "@/src/services/PostServices";
import { updateAccessTokenInCookies } from "@/src/utils/updateAccessTokenInCookies";
import { FileText } from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface ITravelPostCardProps {
  singlePost: any;
  refetch: any;
}

const TravelPostCard = ({ singlePost, refetch }: ITravelPostCardProps) => {
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
  const { user, updateProfile } = useUser();
  const { mutate: handleCreateComment } = useCreateComment();
  const { mutate: handleCommentUpdate } = useUpdateComment();
  const { mutate: handleCommentDelete } = useDeleteComment();
  const { mutate: handleFollowUser } = useFollowUser();
  const { mutate: handleUnfollowUser } = useUnfollowUser();
  const { mutate: handleAddUpvotePost } = useAddUpvotePost();
  const { mutate: handleRemoveUpvotePost } = useRemoveUpvotePost();
  const { mutate: handleAddDownvotePost } = useAddDownvotePost();
  const { mutate: handleRemoveDownvotePost } = useRemoveDownvotePost();
  const { mutate: handlePostUpdate } = useUpdatePost();
  const { data: allComments } = useGetPostAllComments(_id);

  const [isEditing, setIsEditing] = useState<string | null>("");
  const [editedComments, setEditedComments] = useState<{
    [key: string]: string;
  }>({});
  const [commentIdToDelete, setCommentIdToDelete] = useState<string | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [content, setContent] = useState("");
  const { handleSubmit, reset, formState, control, setValue } = useForm();
  const { errors } = formState;
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState(
    status === "PREMIUM" ? true : false
  );
  const router = useRouter();
  const params = new URLSearchParams();
  params.set("id", _id);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("image", file); // Set the file value in the form state
    setFileName(file ? file.name : null);
  };

  const clearFileSelection = () => {
    setFileName("");
    setValue("image", null);
  };

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
      refetch();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleUpdateComment = (commentId: string) => {
    const updatedComment = editedComments[commentId];

    const newComment = {
      text: updatedComment,
    };

    try {
      handleCommentUpdate({ id: commentId, updatedComment: newComment });
      refetch();
      setIsEditing(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = () => {
    if (commentIdToDelete) {
      handleCommentDelete({ id: commentIdToDelete });
      refetch();
    }
  };

  const handleAddFollow = (id: string, name: string) => {
    handleFollowUser({ id, name });
    refetch();
  };

  const handleRemoveFollow = (id: string, name: string) => {
    handleUnfollowUser({ id, name });
    refetch();
  };

  const handleAddUpvote = (id: string) => {
    handleAddUpvotePost({ id });
    refetch();
  };

  const handleRemoveUpvote = (id: string) => {
    handleRemoveUpvotePost({ id });
    refetch();
  };

  const handleAddDownvote = (id: string) => {
    handleAddDownvotePost({ id });
    refetch();
  };

  const handleRemoveDownvote = (id: string) => {
    handleRemoveDownvotePost({ id });
    refetch();
  };

  const handleUpdatePost = async (data: any) => {
    const hasImage = !!data.image;
    const hasTitleChanged = data.title !== title;
    const hasDescriptionChanged = data.description !== description;
    const hasCategoryChanged = data.category !== category;
    const hasPostStatusChanged = (status === "PREMIUM") !== isSelected;

    if (
      !hasImage &&
      !hasTitleChanged &&
      !hasCategoryChanged &&
      !hasDescriptionChanged &&
      !hasPostStatusChanged
    ) {
      setOpenEditModal(false);
      return;
    }

    toast.loading("Updating Post...");

    let imageUrl = image;

    if (hasImage) {
      const formData = new FormData();
      formData.append("file", data.image);
      formData.append(
        "upload_preset",
        envConfig.cloudinary_upload_preset as string
      );

      try {
        const response = await axios.post(
          envConfig.cloudinary_url as string,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = response.data.secure_url;
        console.log(imageUrl);
      } catch (error: any) {
        console.error(error.message);
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      const postData: Partial<IPost> = {
        title: hasTitleChanged ? data.title : title,
        category: hasCategoryChanged ? data.category : category,
        description: hasDescriptionChanged ? data.description : description,
        image: imageUrl,
        status: isSelected ? "PREMIUM" : "BASIC",
      };

      toast.dismiss();

      handlePostUpdate({ postData, id: _id });
      setOpenEditModal(false);
      toast.success("Post updated successfully!");
      refetch();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDeletePost = async () => {
    toast.loading("Deleting post...");
    try {
      const result = await deletePost(_id);
      console.log(result);

      if (result.success) {
        toast.dismiss();

        if (user) {
          const updatedUser = {
            ...user,
            postCount: user.postCount - 1,
          };

          updateProfile(updatedUser);

          updateAccessTokenInCookies(updatedUser);

          toast.success("Post deleted successfully");
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error);
      throw new error(error);
    }
  };

  return (
    <div className="my-5">
      <article className="relative mb-4 break-inside p-4 md:p-6 rounded-xl bg-white flex flex-col bg-clip-border md:w-11/12 lg:w-10/12 xl:w-[75%] mx-auto border border-primary">
        {postAuthor._id === user?._id && (
          <div className="mb-5 cursor-pointer w-20">
            <Dropdown closeOnSelect={true}>
              <DropdownTrigger className="absolute top-3 right-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1773aa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="view"
                  onClick={() =>
                    handleNavigation(`/postDetails?${params.toString()}`)
                  }
                >
                  <span className="flex gap-2 items-center text-primary">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1773aa"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-eye"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                    <span>View Post</span>
                  </span>
                </DropdownItem>

                <DropdownItem key="edit">
                  {" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenEditModal(true);
                    }}
                    className="flex gap-2 items-center text-primary"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1773aa"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </span>
                    <span>Edit Post</span>
                  </span>
                </DropdownItem>

                <DropdownItem key="pdf">
                  <span
                    onClick={() => reactToPrintFn()}
                    className="flex items-center gap-2 cursor-pointer text-primary"
                  >
                    <span>
                      <FileText size={20} />
                    </span>
                    <span>Generate PDF</span>
                  </span>
                </DropdownItem>

                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDeleteModal(true);
                    }}
                    className="flex gap-2 items-center"
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
                        className="lucide lucide-trash-2"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </span>
                    <span>Delete Post</span>
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <div className="inline-block mr-4">
              <img
                className="rounded-full max-w-none w-12 h-12 object-cover"
                src={postAuthor?.profilePhoto}
                alt="man"
              />
            </div>
            <div className="flex flex-col">
              <Link href={`/postDetails?id=${_id}`}>
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
            {postAuthor?._id !== user?._id && (
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
          <div className="mt-2 mb-6 md:mb-0 md:mt-0">
            <div className="hidden rounded-full border border-primary px-3 py-2 text-primary font-semibold md:inline-flex mb-2 gap-1 w-auto">
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
        </div>

        {/* category part for small device */}
        <div className="mt-2 mb-6 md:mb-0 md:mt-0">
          <span className="rounded-full border border-primary px-3 py-2  text-primary font-semibold md:hidden mb-2">
            {category}
          </span>
        </div>

        <div ref={contentRef}>
          {/* title part */}
          <h2 className="text-3xl font-extrabold">{title}</h2>

          {/* image part */}
          <div className="py-4">
            <div className="flex justify-between gap-1">
              <div className="flex w-full">
                <div className="overflow-hidden rounded-br-lg w-full h-[450px]">
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
        </div>

        {/* upvote,downvote & comment count */}
        <div className="py-4 flex gap-5">
          <div className="inline-flex items-center">
            {upvote?.includes(user?._id) ? (
              <div
                onClick={() =>
                  postAuthor?._id !== user?._id &&
                  handleRemoveUpvote(_id as string)
                }
                className="mr-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-thumbs-up text-primary"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </div>
            ) : (
              <div
                onClick={() =>
                  postAuthor?._id !== user?._id &&
                  handleAddUpvote(_id as string)
                }
                className="mr-2 cursor-pointer"
              >
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
              </div>
            )}

            <span className="text-lg font-bold">{upvote?.length || 0}</span>
          </div>
          <div className="inline-flex items-center">
            {downvote?.includes(user?._id) ? (
              <span
                onClick={() =>
                  postAuthor?._id !== user?._id && handleRemoveDownvote(_id)
                }
                className="mr-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
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
            ) : (
              <span
                onClick={() =>
                  postAuthor?._id !== user?._id && handleAddDownvote(_id)
                }
                className="mr-2 cursor-pointer"
              >
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
            )}
            <span className="text-lg font-bold">{downvote?.length || 0}</span>
          </div>
          <div className="inline-flex items-center">
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
          </div>
        </div>

        {/* Write comment part */}
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

        {/* Comment Section */}
        <div>
          {allComments?.data?.result?.length > 0 && (
            <div className="pt-6">
              {allComments.data.result.map((comment: any) => {
                return (
                  <div key={comment._id} className="pb-4">
                    <div className="flex ">
                      <div className="mr-4">
                        <img
                          className="rounded-full max-w-none w-12 h-12 object-cover"
                          src={comment.user?.profilePhoto}
                          alt={comment.user?.name}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-7 w-full">
                        <div className="w-full">
                          {/* increase the width of this div */}
                          <div className="w-full">
                            <div className="inline-block font-bold mr-2">
                              {comment.user?.name}
                            </div>
                            <span className="text-xs md:text-sm text-slate-500">
                              {new Date(comment.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
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
                            <div
                              className={`hidden md:flex gap-3 mr-2 ${
                                isEditing && "md:hidden"
                              }`}
                            >
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

                              <Tooltip
                                showArrow={true}
                                content="Delete Comment"
                              >
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

                    <>
                      {comment?.user?._id === user?._id && (
                        <div
                          className={`flex md:hidden gap-3 mt-4 ml-16 ${
                            isEditing && "hidden"
                          }`}
                        >
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
                    </>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>

      {openEditModal && (
        <UpdatePostModal
          control={control}
          errors={errors}
          content={content}
          setContent={setContent}
          handleSubmit={handleSubmit(handleUpdatePost)}
          reset={reset}
          setOpenEditModal={setOpenEditModal}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          fileName={fileName}
          handleFileChange={handleFileChange}
          clearFileSelection={clearFileSelection}
          openEditModal={openEditModal}
          title={title}
          description={description}
          category={category}
          setValue={setValue}
        />
      )}

      {openDeleteModal && (
        <DeletePostModal
          handleDeletePost={handleDeletePost}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default TravelPostCard;
