import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/PostServices";
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
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
