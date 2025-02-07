import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useRefreshTasks = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    if (!userId) return;
    setRefreshing(true);
    try {
      await queryClient.invalidateQueries({
        queryKey: ["tasks", userId],
      });
    } catch (err) {
      console.error("Failed to refresh tasks:", err);
    } finally {
      setRefreshing(false);
    }
  };

  return { refreshing, onRefresh };
};
