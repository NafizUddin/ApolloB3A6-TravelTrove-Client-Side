import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  forgotPassword,
  loginUser,
  registerUser,
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
      toast.error("Error when giving payment: " + error.message);
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

export const useForgotPassword = () => {
  console.log("useForgotPassword hook called");

  return useMutation<any, Error, { email: string }>(async (userData) => {
    console.log("Forgot password mutation triggered");
    try {
      const response = await forgotPassword(userData);
      console.log("Response from forgotPassword:", response);
      return response;
    } catch (error) {
      console.error("Error in mutation:", error);
      throw error;
    }
  });
};
