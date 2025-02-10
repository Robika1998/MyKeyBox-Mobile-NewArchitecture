import { Stack } from "expo-router";
import Navbar from "@/components/Navbar/Navbar";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import NavbarMenuModal from "@/components/Modal/NavbarMenuModal";

const UserLayout = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={styles.container}>
        <View style={styles.navbarWrapper}>
          <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </View>

        <View style={styles.stackContainer}>
          <Stack
            initialRouteName="index"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </View>

        {menuVisible && (
          <NavbarMenuModal
            isVisible={menuVisible}
            onClose={() => setMenuVisible(false)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarWrapper: {
    zIndex: 1,
    elevation: 4,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stackContainer: {
    flex: 1,
    marginTop: 130,
    padding: 3,
    paddingTop: 10,
  },
});
