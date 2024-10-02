"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const followUser = async (followedId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/users/${followedId}/follow`);

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
