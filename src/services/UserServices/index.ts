"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IUpdateComment, IUser } from "@/src/types";
import { revalidateTag } from "next/cache";

export const followUser = async (followedId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/users/${followedId}/follow`);

    revalidateTag("follow");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const unFollowUser = async (followedId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${followedId}/follow`);

    revalidateTag("follow");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateUser = async (
  payload: Partial<IUpdateComment>,
  id: string
) => {
  console.log("payload", payload);

  try {
    const { data } = await axiosInstance.put(`/users/${id}`, payload);

    revalidateTag("users");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
