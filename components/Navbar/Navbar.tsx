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

const Logo = require("../../assets/Icons/logo-dark.png");
const Menu = require("../../assets/Icons/list-view.png");

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.navbarContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.innerContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.memberText}>Member</Text>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Image source={Menu} style={styles.menuIcon} />
        </TouchableOpacity>
        {menuVisible && (
          <NavbarMenuModal
            isVisible={menuVisible}
            onClose={() => setMenuVisible(false)}
          />
        )}
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
    paddingTop: Platform.OS === "ios" ? 70 : 40,
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
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },
});
