import { useMutation } from "@tanstack/react-query";
import { useUser } from "../context/user.provider";
import { IUser } from "../types";
import { startPremium } from "../services/PaymentService";
import toast from "react-hot-toast";

export const useStartPremium = () => {
  return useMutation<any, Error, Partial<IUser>>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (payload) => {
      return toast.promise(startPremium(payload), {
        loading: "Payment loading...",
        success: `Subscribed to Premium plan successfully!`,
        error: "Error when giving payment.",
      });
    },
  });
};
