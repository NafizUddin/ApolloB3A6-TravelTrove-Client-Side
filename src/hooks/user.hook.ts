import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { followUser, unFollowUser, updateUser } from "../services/UserServices";
import { IUpdateUser, IUser } from "../types";

export const useFollowUser = () => {
  return useMutation<any, Error, { id: string; name: string }>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async ({ id, name }) => {
      return toast.promise(followUser(id), {
        loading: "Following user...",
        success: `You followed ${name}!`,
        error: "Error when following user.",
      });
    },
  });
};

export const useUnfollowUser = () => {
  return useMutation<any, Error, { id: string; name: string }>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async ({ id, name }) => {
      return toast.promise(unFollowUser(id), {
        loading: "Unfollowing user...",
        success: `You unfollowed ${name}!`,
        error: "Error when following user.",
      });
    },
  });
};

export const useUpdateUser = () => {
  return useMutation<any, Error, { userData: IUpdateUser; id: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userData, id }) => {
      return toast.promise(updateUser(userData, id), {
        loading: "Updating profile...",
        success: `Profile updated successfully!`,
        error: "Error when updating user.",
      });
    },
  });
};
