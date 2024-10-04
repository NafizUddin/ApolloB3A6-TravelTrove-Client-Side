import { useMutation } from "@tanstack/react-query";
import { useUser } from "../context/user.provider";
import { IUser } from "../types";
import { startPremium } from "../services/PaymentService";
import toast from "react-hot-toast";

export const useStartPremium = (onSuccessCallback: any) => {
  return useMutation<any, Error, Partial<IUser>>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (payload) => {
      const response = await startPremium(payload); // Await the response directly
      return response; // Return the response for further processing
    },
    onSuccess: (data) => {
      console.log(data, "from hook");
      toast.success("Subscribed to Premium plan successfully!");
      onSuccessCallback(data); // Call the provided callback with the response data
    },
    onError: (error) => {
      toast.error("Error when giving payment: " + error.message);
    },
  });
};
