import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetMemberOrderInfoById,
  GetMemberTaskById,
} from "@/Api/MemberRequest/MemberRequest";
import { useAuthToken } from "@/hooks/useAuthToken";
import OrderDetailsModal from "@/components/Modal/OrderDetailsModal";
import { useRefreshTasks } from "@/hooks/useRefreshTasks";

export default function User() {
  const { userId } = useAuthToken();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const { refreshing, onRefresh } = useRefreshTasks(userId as string);

  const { data, isPending, error } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => GetMemberTaskById(Number(userId)),
    enabled: !!userId,
  });

  console.log("data", data);
  const fetchOrderDetails = async (orderId: number) => {
    setLoadingDetails(true);
    try {
      const orderDetails = await GetMemberOrderInfoById(orderId);
      setSelectedOrder(orderDetails);
    } catch (err: any) {
      console.error(
        "Failed to fetch order details:",
        err.response?.data || err.message
      );
    } finally {
      setLoadingDetails(false);
    }
  };
  const Item = ({ task, index }: { task: any; index: number }) => (
    <TouchableOpacity
      key={index}
      style={styles.taskCard}
      onPress={() => fetchOrderDetails(task.id)}
    >
      <View style={styles.taskHeader}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          VIN Code: {""}
          <Text style={styles.vinText}>{task.vin}</Text>
        </Text>
      </View>
      <View style={styles.taskBody}>
        <Text style={[styles.taskText, styles.carrierNameText]}>
          <Text style={styles.label}>Carrier Name: </Text>
          {task.carrierName || "No Carrier"}
        </Text>
        <Text style={[styles.taskText, styles.dealerNameText]}>
          <Text style={styles.label}>Dealer Name: </Text>
          {task.dealerName}
        </Text>
        <Text
          style={[
            styles.taskText,
            task.confirmedDealer
              ? styles.confirmedText
              : styles.unconfirmedText,
          ]}
        >
          <Text style={styles.label}>Confirm: </Text>
          {task.confirmedDealer ? "Yes" : "Not Confirm"}
        </Text>
        <Text style={[styles.taskText, styles.orderStatusText]}>
          <Text style={styles.label}>Order Status: </Text>
          {task.orderStatus}
        </Text>
        <Text style={[styles.taskText, styles.orderDateText]}>
          <Text style={styles.label}>Order Date: </Text>
          {task.orderDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isPending)
    return (
      <ActivityIndicator style={styles.loader} size="large" color="orange" />
    );

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {(error as Error).message || "Failed to fetch tasks"}
        </Text>
      </View>
    );

  // const tasks = data?.tasks || [];
  const tasks = data?.tasks?.slice().reverse() || [];

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => <Item task={item} index={index} />}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        ) : (
          <Text style={styles.noTasks}>You have no orders</Text>
        )}
      </View>

      <OrderDetailsModal
        visible={!!selectedOrder}
        loading={loadingDetails}
        orderDetails={selectedOrder}
        // onClose={() => setSelectedOrder(null)}
        onClose={() => {
          setSelectedOrder(null);
          onRefresh();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    marginTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  scrollView: {
    height: "100%",
    width: "100%",
    // paddingBottom: 20,
  },
  loader: { alignSelf: "center" },
  errorContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "#FFE5E5",
  },
  errorText: {
    color: "#D9534F",
    fontSize: 16,
    textAlign: "center",
  },
  taskCard: {
    backgroundColor: "#e2e2e2",
    borderRadius: 16,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#002C51",
  },
  taskHeader: { marginBottom: 12 },
  vinText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#002C51",
    textTransform: "uppercase",
  },
  taskBody: { marginTop: 8 },
  taskText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  confirmedText: {
    color: "green",
    fontWeight: "600",
  },
  unconfirmedText: {
    color: "red",
    fontWeight: "600",
  },
  carrierNameText: {
    color: "#007AFF",
  },
  dealerNameText: {
    color: "#FF9500",
  },
  orderStatusText: {
    color: "#5856D6",
  },
  orderDateText: {
    color: "#FF2D55",
  },
  noTasks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
