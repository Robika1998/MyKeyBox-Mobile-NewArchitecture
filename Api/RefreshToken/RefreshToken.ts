import * as SecureStore from "expo-secure-store";
import { ApiManager } from "../ApiManager";
import { useNavigation } from "expo-router";

export const refreshToken = async () => {
  const navigation: any = useNavigation();
  try {
    const accessToken = await SecureStore.getItemAsync("token");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

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

    await SecureStore.setItemAsync("token", newToken);
    await SecureStore.setItemAsync("refreshToken", newRefreshToken);

    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      navigation.navigate("(auth)");
    }
    throw error;
  }
};

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ApiManager } from "../ApiManager";
// import { useAuthToken } from "@/hooks/useAuthToken";

// export const refreshToken = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem("token");
//     const refreshToken = await AsyncStorage.getItem("refreshToken");

//     const data = await ApiManager("dealership-module/MemberAuth/Refresh", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         accessToken,
//         refreshToken,
//       },
//     });

//     const newToken = data.data.token;
//     const newRefreshToken = data.data.refreshToken;

//     await AsyncStorage.setItem("token", newToken);
//     await AsyncStorage.setItem("refreshToken", newRefreshToken);

//     return data;
//   } catch (error: any) {
//     console.log("Refresh Token Error:", error);

//     if (error.response && error.response.status === 401) {
//       const { clearToken } = useAuthToken();
//       clearToken();
//     }

//     throw error;
//   }
// };
