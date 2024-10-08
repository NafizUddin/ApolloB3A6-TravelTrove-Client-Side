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
import { ICreatePostData, IPost, IUser } from "../types";
import { useUser } from "../context/user.provider";
import { updateAccessTokenInCookies } from "../utils/updateAccessTokenInCookies";

export const useCreatePost = () => {
  const { user, updateProfile } = useUser();

  return useMutation<ICreatePostData, Error, ICreatePostData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: (_data) => {
      if (user) {
        const updatedUser: IUser = {
          ...user,
          postCount: user.postCount + 1,
        };

        updateProfile(updatedUser);

        updateAccessTokenInCookies(updatedUser);
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

export const useGetAllPosts = (apiUrl: string) => {
  return useQuery(
    ["posts", apiUrl],
    async () => {
      const response = await getAllPostsNewsFeed(apiUrl);
      if (!response || !response.data) {
        throw new Error("Failed to fetch posts");
      }
      return response.data;
    }
    // {
    //   refetchInterval: 2000,
    // }
  );
};

export const useGetAllPostsInDashboard = (query?: string) => {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: query ? ["posts", query] : ["posts"],
    queryFn: async () => await getAllPostsDashboard(query || ""),
    refetchInterval: 1000,
  });

  return { data, error, refetch, isLoading };
};

export const useGetSinglePost = (id: string) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["singlePost", id],
    queryFn: async () => await getSinglePost(id),
    enabled: !!id, // Only fetch if id is truthy
    refetchInterval: 1000,
  });

  return { data, refetch, isLoading };
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
  const { user, updateProfile } = useUser();

  return useMutation<any, Error, { id: string }>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(deletePost(id), {
        loading: "Deleting Post...",
        success: "Post deleted successfully!",
        error: "Error when deleting comment.",
      });
    },
    onSuccess: (_data) => {
      if (user) {
        const updatedUser: IUser = {
          ...user,
          postCount: user.postCount - 1,
        };

        updateProfile(updatedUser);

        updateAccessTokenInCookies(updatedUser);
      }
    },
  });
};
