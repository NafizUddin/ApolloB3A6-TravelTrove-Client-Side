import envConfig from "@/src/config/envConfig";
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";

const nexiosInstance = new Nexios({
  baseURL: envConfig.baseApi,
  credentials: "include",
});

nexiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value;

  console.log(accessToken);

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `${accessToken}`,
    };
  }

  return config;
});

export default nexiosInstance;
