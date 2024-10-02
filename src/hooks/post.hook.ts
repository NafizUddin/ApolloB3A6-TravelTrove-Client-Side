import { useMutation } from "@tanstack/react-query";
import {
  addDownvote,
  addUpvote,
  createPost,
  removeDownvote,
  removeUpvote,
} from "../services/PostServices";
import toast from "react-hot-toast";
import { ICreatePostData } from "../types";

export const useCreatePost = () => {
  return useMutation<ICreatePostData, Error, ICreatePostData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => {
      return toast.promise(createPost(postData), {
        loading: "Loading...",
        success: "Post created successfully!",
        error: "Error when creating post.",
      });
    },
  });
};

export const useAddUpvotePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["ADD_UPVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(addUpvote(id), {
        loading: "Upvoting post...",
        success: `You upvoted this post!`,
        error: "Error when upvoting post.",
      });
    },
  });
};

export const useRemoveUpvotePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["REMOVE_UPVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(removeUpvote(id), {
        loading: "Removing upvote post...",
        success: `You removed upvoting this post!`,
        error: "Error when upvoting post.",
      });
    },
  });
};

export const useAddDownvotePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["ADD_DOWNVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(addDownvote(id), {
        loading: "Downvoting post...",
        success: `You downvoted this post!`,
        error: "Error when downvoting post.",
      });
    },
  });
};

export const useRemoveDownvotePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["REMOVE_UPVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(removeDownvote(id), {
        loading: "Removing downvote post...",
        success: `You removed downvoting this post!`,
        error: "Error when downvoting post.",
      });
    },
  });
};
