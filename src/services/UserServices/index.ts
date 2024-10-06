"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types";
import { revalidateTag } from "next/cache";

export const followUser = async (followedId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/users/${followedId}/follow`);

    revalidateTag("follow");

    return data.data;
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

    return data.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateUser = async (payload: Partial<IUser>, id: string) => {
  try {
    const { data } = await axiosInstance.put(`/users/${id}`, payload);

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
