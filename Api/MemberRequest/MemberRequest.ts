import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../ApiManager";

export const GetMemberTaskById = async (memberId: number) => {
  const token = await AsyncStorage.getItem("token");

  try {
    // console.log("Token:", token);

    const response = await ApiManager(
      `dealership-module/Member/GetMyTask?memberId=${memberId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const responseError = error as {
        response: { data: { message: string } };
      };
      throw new Error(
        responseError.response.data?.message || "Unknown error occurred."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const GetMemberOrderInfoById = async (orderId: number) => {
  const token = await AsyncStorage.getItem("token");

  try {
    // console.log("Token:", token);

    const response = await ApiManager(
      `dealership-module/Member/GetOrderById/${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Fetching details for Order ID:", orderId);

    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    } else if (error && typeof error === "object" && "response" in error) {
      const responseError = error as {
        response: { data: { message: string } };
      };
      throw new Error(
        responseError.response.data?.message || "Unknown error occurred."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
