import { useAuthToken } from "@/hooks/useAuthToken";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import AccountSettings from "./AccountSettings";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NavbarMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NavbarMenuModal({
  isVisible,
  onClose,
}: NavbarMenuModalProps) {
  const slideAnim = useRef(new Animated.Value(isVisible ? 0 : 300)).current;
  const { clearToken } = useAuthToken();
  const navigation: any = useNavigation();
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(300);
    } else {
      slideAnim.setValue(300);
    }

    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 300,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleLogout = async () => {
    try {
      await clearToken();
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "(auth)" }],
        });
      } else {
        console.warn("Token not cleared properly.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <TouchableOpacity onPress={onClose} style={styles.overlay} />
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setAccountModalVisible(true)}
          >
            <Text style={styles.menuText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setPrivacyModalVisible(true)}
          >
            <Text style={styles.menuText}>Privacy & Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuTextLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <AccountSettings
        isVisible={isAccountModalVisible}
        onClose={() => setAccountModalVisible(false)}
      />
      <PrivacyPolicyModal
        isVisible={isPrivacyModalVisible}
        onClose={() => setPrivacyModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 90,
    right: -18,
    width: 200,
    backgroundColor: "#3498db",
    zIndex: 200,
    elevation: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  modalContent: {
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#5dade2",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  menuTextLogout: {
    fontSize: 18,
    fontWeight: "500",
    color: "red",
  },
});
