"use server";
import envConfig from "@/src/config/envConfig";
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

export const getAllPostsHomePage = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/posts`, fetchOption);

  return res.json();
};
