import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDownvote,
  addUpvote,
  createPost,
  deletePost,
  getAllPostsDashboard,
  getAllPostsNewsFeed,
  getSinglePost,
  removeDownvote,
  removeUpvote,
  updatePost,
} from "../services/PostServices";
import toast from "react-hot-toast";
import { ICreatePostData, IPost } from "../types";

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

export const useGetAllPosts = (apiUrl: string) => {
  return useQuery({
    queryKey: [apiUrl],
    queryFn: async () => await getAllPostsNewsFeed(apiUrl),
  });
};

export const useGetAllPostsInDashboard = (query?: string) => {
  const { data, error, refetch, isFetching } = useQuery({
    queryKey: query ? ["posts", query] : ["posts"],
    queryFn: async () => await getAllPostsDashboard(query || ""),
  });

  return { data, error, refetch, isFetching };
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["singlePost", id],
    queryFn: async () => await getSinglePost(id),
    enabled: !!id, // Only fetch if id is truthy
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

export const useUpdatePost = () => {
  return useMutation<any, Error, { postData: Partial<IPost>; id: string }>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postData, id }) => await updatePost(postData, id),
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(deletePost(id), {
        loading: "Deleting Post...",
        success: "Post deleted successfully!",
        error: "Error when deleting comment.",
      });
    },
  });
};
