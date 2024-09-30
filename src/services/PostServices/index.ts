"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import nexiosInstance from "nexios-http";
import { revalidateTag } from "next/cache";

interface PostData {
  title: string;
  category: string;
  description: string;
  image: string;
}

export const createPost = async (formData: PostData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts", formData);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    console.log(error.response ? error.response.data : error.message);
  }
};
