"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { ICreatePostData } from "@/src/types";
import nexiosInstance from "nexios-http";
import { revalidateTag } from "next/cache";

export const createPost = async (formData: ICreatePostData): Promise<any> => {
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
  const data = await res.json();

  return data;
};
