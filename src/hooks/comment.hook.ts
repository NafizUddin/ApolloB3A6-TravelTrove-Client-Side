import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IComment } from "../types";
import { createComment, getPostAllComments } from "../services/CommentServices";

export const useCreateComment = () => {
  return useMutation<IComment, Error, IComment>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (commentData) => {
      return toast.promise(createComment(commentData), {
        loading: "Loading...",
        success: "You added a new comment!",
        error: "Error when creating comment.",
      });
    },
  });
};

export const useGetPostAllComments = (postId: string) => {
  return useQuery({
    queryKey: [postId],
    queryFn: async () => await getPostAllComments(postId),
    enabled: !!postId, // Only run the query if postId is provided
  });
};
