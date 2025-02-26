import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "expo-router";

import { decodedUserType } from "@/types/Auth-types";

export const useAuthToken = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          const decoded: decodedUserType = jwtDecode(token);
          setUserId(decoded.Id);
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  const saveToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync("token", token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      const decoded: decodedUserType = jwtDecode(token);
      setUserId(decoded.Id);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const clearToken = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      setUserId(null);
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };

  return { userId, loading, saveToken, clearToken };
};
