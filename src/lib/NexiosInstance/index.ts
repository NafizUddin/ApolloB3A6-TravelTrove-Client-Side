import envConfig from "@/src/config/envConfig";
import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: envConfig.baseApi,
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;
