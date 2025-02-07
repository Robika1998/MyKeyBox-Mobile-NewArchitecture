import { Stack } from "expo-router";
import Navbar from "@/components/Navbar/Navbar";
import { View } from "react-native";

const UserLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
};

export default UserLayout;
