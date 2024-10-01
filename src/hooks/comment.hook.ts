import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IComment } from "../types";
import { createComment } from "../services/CommentServices";

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
