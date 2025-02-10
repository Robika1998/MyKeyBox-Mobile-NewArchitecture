import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
} from "react-native";
import NavbarMenuModal from "../Modal/NavbarMenuModal";
import { useQuery } from "@tanstack/react-query";
import { GetMemberTaskById } from "@/Api/MemberRequest/MemberRequest";
import { useAuthToken } from "@/hooks/useAuthToken";

const Logo = require("../../assets/Icons/logo-dark.png");
const Menu = require("../../assets/Icons/list-view.png");

interface NavbarProps {
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
}

export default function Navbar({ menuVisible, setMenuVisible }: NavbarProps) {
  const { userId } = useAuthToken();

  const { data: taskName } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => GetMemberTaskById(Number(userId)),
    enabled: !!userId,
    select: (data) => data.name,
  });

  const displayName = taskName || "Unknown";

  return (
    <View style={styles.navbarContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.memberText}>{displayName}</Text>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Image source={Menu} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "ios" ? 70 : 70,
    paddingHorizontal: 16,
    backgroundColor: "#2874a6",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "#5dade2",
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#333",
  },
  memberText: {
    fontSize: 30,
    fontWeight: "500",
    color: "#fff",
  },
});
