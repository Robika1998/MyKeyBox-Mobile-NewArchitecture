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
          console.log("aaaaaaaaaaa", decoded);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { userId, loading };
};
