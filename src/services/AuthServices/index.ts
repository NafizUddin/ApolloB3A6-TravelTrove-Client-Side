"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IRegister } from "@/src/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const response: any = await nexiosInstance.post("/auth/login", userData);

    if (response.data.success) {
      cookies().set("accessToken", response.data?.data?.accessToken);
      cookies().set("refreshToken", response.data?.data?.refreshToken);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const registerUser = async (userData: IRegister) => {
  try {
    const response: any = await axiosInstance.post("/auth/register", userData);

    if (response.data.success) {
      cookies().set("accessToken", response.data?.data?.accessToken);
      cookies().set("refreshToken", response.data?.data?.refreshToken);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      status: decodedToken.status,
      profilePhoto: decodedToken.profilePhoto,
      followers: decodedToken.followers,
      following: decodedToken.following,
      isVerified: decodedToken.isVerified,
      totalUpvote: decodedToken.totalUpvote,
      postCount: decodedToken.postCount,
      paymentStatus: decodedToken.paymentStatus,
      transactionId: decodedToken.transactionId,
      premiumStart: decodedToken.premiumStart,
      premiumEnd: decodedToken.premiumEnd,
      premiumCharge: decodedToken.premiumCharge,
    };
  }

  return decodedToken;
};

export const forgotPassword = async (userEmail: { email: string }) => {
  try {
    const response = await fetch(`${envConfig.baseApi}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send reset link");
    }

    const result = await response.json();
    console.log("Response received:", result);
    return result;
  } catch (error: any) {
    console.error("Error in forgotPassword:", error);
    throw error;
  }
};

export const resetPassword = async (
  userData: {
    email: string;
    newPassword: string;
  },
  token: string
) => {
  try {
    const response = await fetch(`${envConfig.baseApi}/auth/reset-password`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to reset password");
    }

    const result = await response.json();
    console.log("Response received:", result);
    return result;
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    throw error;
  }
};
