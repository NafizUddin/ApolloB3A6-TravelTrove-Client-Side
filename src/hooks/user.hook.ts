import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { followUser, unFollowUser, updateUser } from "../services/UserServices";
import { IUpdateUser, IUser } from "../types";
import { useUser } from "../context/user.provider";
import { updateAccessTokenInCookies } from "../utils/updateAccessTokenInCookies";

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
  const { user, updateProfile } = useUser();

  return useMutation<any, Error, { userData: Partial<IUser>; id: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userData, id }) => {
      return toast.promise(updateUser(userData, id), {
        loading: "Updating profile...",
        success: `Profile updated successfully!`,
        error: "Error when updating user.",
      });
    },
    onSuccess: (_data, { userData }) => {
      if (user) {
        const updatedUser: IUser = {
          _id: user._id,
          name: userData.name || user.name,
          email: userData.email || user.email,
          profilePhoto: userData.profilePhoto || user.profilePhoto,
          role: userData.role || user.role,
          status: userData.status || user.status,
          followers: userData.followers || user.followers,
          following: userData.following || user.following,
          isVerified: userData.isVerified || user.isVerified,
          totalUpvote: userData.totalUpvote || user.totalUpvote,
          postCount: userData.postCount || user.postCount,
          paymentStatus: userData.paymentStatus || user.paymentStatus || "",
          transactionId: userData.transactionId || user.transactionId || "",
          premiumStart: userData.premiumStart || user.premiumStart,
          premiumEnd: userData.premiumEnd || user.premiumEnd,
          premiumCharge: userData.premiumCharge || user.premiumCharge || 0,
        };

        updateProfile(updatedUser);

        updateAccessTokenInCookies(updatedUser);
      }
    },
  });
};
