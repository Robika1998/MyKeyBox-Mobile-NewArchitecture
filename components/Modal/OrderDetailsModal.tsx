import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

type OrderDetailsModalProps = {
  visible: boolean;
  loading: boolean;
  orderDetails: any;
  onClose: () => void;
};

export default function OrderDetailsModal({
  visible,
  loading,
  orderDetails,
  onClose,
}: OrderDetailsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.modalHeader}>Order Details</Text>
              {orderDetails ? (
                <>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>VIN:</Text>{" "}
                    {orderDetails.vin}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Vehicle:</Text>{" "}
                    {orderDetails.vehicle || "N/A"}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Carrier:</Text>{" "}
                    <Text style={{ color: "#1ce61f" }}>
                      {" "}
                      {orderDetails.sharedCarrier || "N/A"}
                    </Text>
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Dealership Office:</Text>{" "}
                    <Text style={{ color: "#FF5733" }}>
                      {" "}
                      {orderDetails.sharedDealershipOffice || "N/A"}
                    </Text>
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Dealer Code:</Text>{" "}
                    <Text style={{ color: "green" }}>
                      {" "}
                      {orderDetails.dealerCode}
                    </Text>
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Guest User Code:</Text>
                    <Text style={{ color: "#00d0f1" }}>
                      {" "}
                      {orderDetails.guestUserCode}
                    </Text>
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Order Status:</Text>{" "}
                    {orderDetails.orderStatus}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Confirmed:</Text>{" "}
                    {orderDetails.confirmedByDealership ? "Yes" : "No"}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Order Date:</Text>{" "}
                    {orderDetails.orderDate}
                  </Text>

                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Locker Unique Code:</Text>{" "}
                    {orderDetails.lockerUniqueCode || "N/A"}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Pickup Information:</Text>{" "}
                    {orderDetails.pickupInformation || "N/A"}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>Delivery Information:</Text>{" "}
                    {orderDetails.deliveryInformation || "N/A"}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.labelText}>
                      Additional Information:
                    </Text>{" "}
                    {orderDetails.additionalInformation || "N/A"}
                  </Text>
                </>
              ) : (
                <Text style={styles.noDetailsText}>No details found</Text>
              )}
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeButtonContainer}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FF6F61",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#002C51",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  modalText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
    lineHeight: 24,
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#f9bd35",
  },
  labelText: {
    fontWeight: "bold",
    color: "#081d8a",
  },
  noDetailsText: {
    fontSize: 18,
    color: "#D9534F",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  closeButtonContainer: {
    backgroundColor: "#FF6F61",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 25,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
