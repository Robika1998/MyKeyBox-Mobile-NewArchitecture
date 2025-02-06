import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../ApiManager";

export const refreshToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("token");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const data = await ApiManager("dealership-module/MemberAuth/Refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        accessToken,
        refreshToken,
      },
    });

    const newToken = data.data.token;
    const newRefreshToken = data.data.refreshToken;

    await AsyncStorage.setItem("token", newToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    return data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
