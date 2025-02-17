import { DeleteAccount } from "@/Api/DeleteAccount/DeleteAcount";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface AccountSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AccountSettings({
  isVisible,
  onClose,
}: AccountSettingsModalProps) {
  const navigation: any = useNavigation();
  const { userId } = useAuthToken();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete the account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleAccountDeletion(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const mutation = useMutation({
    mutationFn: (id: string) => DeleteAccount(id),
    onError(err) {
      console.log(err);
      Alert.alert(
        "Warning",
        "Something happened while deleting your account. Please contact support."
      );
    },
    onSuccess() {
      Alert.alert("Warning", "Your account has been deleted.");
      setTimeout(() => {
        navigation.navigate("(auth)");
      }, 2000);
    },
  });

  const handleAccountDeletion = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    await mutation.mutateAsync(userId);
  };
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Account Settings</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 320,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 18,
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#b0b0b0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
