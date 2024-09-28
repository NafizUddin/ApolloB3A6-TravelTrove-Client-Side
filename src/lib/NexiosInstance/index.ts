import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;
