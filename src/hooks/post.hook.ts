import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, getAllPostsHomePage } from "../services/PostServices";
import toast from "react-hot-toast";

interface PostData {
  title: string;
  category: string;
  description: string;
  image: string;
}

export const useCreatePost = () => {
  return useMutation<PostData, Error, PostData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => {
      return toast.promise(createPost(postData), {
        loading: "Loading...",
        success: "Post created successfully!",
        error: "Error when creating post.",
      });
    },
  });
};
