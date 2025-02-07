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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    height: 200,

    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 16,
  },
});
