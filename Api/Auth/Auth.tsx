import { envirement } from "@/env";
import * as SecureStore from "expo-secure-store";
import { ApiManager } from "../ApiManager";
import { loginType } from "@/types/Auth-types";

export const LoginPostRequest = async (body: loginType): Promise<any> => {
  try {
    const res = await ApiManager("dealership-module/MemberAuth/SignInMember", {
      method: "POST",
      data: {
        login: body.login,
        password: body.password,
      },
      headers: {
        ApiKey: envirement.apiKey,
      },
    });

    const token = res?.data?.token;
    const refreshToken = res?.data?.refreshToken;
    if (!token) throw new Error("Token is missing in response");

    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error("Login Error:", error.response.data.message);
      throw new Error(error.response.data.message || "Login Failed");
    }
    throw new Error("Network error or server issue");
  }
};
