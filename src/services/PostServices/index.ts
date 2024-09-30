import nexiosInstance from "nexios-http";
import { revalidateTag } from "next/cache";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await nexiosInstance.post("/posts", formData);

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};
