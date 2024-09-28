import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser } from "../services/AuthServices";
import toast from "react-hot-toast";

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("Logged in successfully", {
        duration: 4000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 4000,
      });
    },
  });
};
