import { envirement } from "@/env";
import axios from "axios";

export const ApiManager = axios.create({
  baseURL: envirement.baseUrl,

  responseType: "json",
  withCredentials: true,
  httpsAgent: {
    rejectUnauthorized: false,
  },
});
