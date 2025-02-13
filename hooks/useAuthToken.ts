import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import { decodedUserType } from "@/types/Auth-types";

export const useAuthToken = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded: decodedUserType = jwtDecode(token);
          setUserId(decoded.Id);
          console.log("Token Decoded:", decoded);
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
      await AsyncStorage.setItem("token", token);
      const decoded: decodedUserType = jwtDecode(token);
      setUserId(decoded.Id);
      console.log("Token Saved:", decoded);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUserId(null);
      console.log("Token Cleared");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };

  return { userId, loading, saveToken, clearToken };
};
