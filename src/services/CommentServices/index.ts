"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { IComment } from "@/src/types";
import { revalidateTag } from "next/cache";

export const createComment = async (commentData: IComment): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", commentData);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    console.log(error.response ? error.response.data : error.message);
  }
};
