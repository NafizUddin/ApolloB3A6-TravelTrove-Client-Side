"use server";
import { cookies } from "next/headers";

export const getAccessToken = (): string | null => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return accessToken ? accessToken.value : null;
};
