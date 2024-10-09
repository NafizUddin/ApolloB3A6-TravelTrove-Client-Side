import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthServices";
import toast from "react-hot-toast";
import { IRegister } from "../types";

export const useUserLogin = (onSuccessCallback: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => {
      const response = await loginUser(userData);
      return response;
    },
    onSuccess: (data) => {
      onSuccessCallback(data); // Call the provided callback with the response data
    },
    onError: (error) => {
      toast.error("Error when signing in: " + error.message);
    },
  });
};

export const useUserRegistration = () => {
  return useMutation<IRegister, Error, IRegister>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => {
      return toast.promise(registerUser(userData), {
        loading: "Loading...",
        success: "Account created successfully!",
        error: "Error when creating post.",
      });
    },
  });
};

export const useResetPassword = (onSuccessCallback: any) => {
  console.log("useResetPassword hook called");

  return useMutation<
    any,
    Error,
    { email: string; newPassword: string; token: string }
  >({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async ({ email, newPassword, token }) => {
      const response = await resetPassword({ email, newPassword }, token);
      return response;
    },
    onSuccess: (data) => {
      onSuccessCallback(data); // Call the provided callback with the response data
    },
  });
};
