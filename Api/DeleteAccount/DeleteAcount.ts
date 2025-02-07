import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../ApiManager";
import { envirement } from "@/env";

export const DeleteAccount = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const res = await ApiManager(
      `dealership-module/Member/DeleteProfile/${id}`,
      {
        method: "DELETE",
        headers: {
          ApiKey: envirement.apiKey,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err.message || "Something went wrong");
  }
};
