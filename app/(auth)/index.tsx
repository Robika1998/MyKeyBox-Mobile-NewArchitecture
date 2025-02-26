// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   View,
//   Text,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Animated,
//   Platform,
//   Alert,
// } from "react-native";
// import React, { useState, useEffect, useRef } from "react";
// import AuthInput from "@/components/Input/AuthInput";
// import { loginType } from "@/types/Auth-types";
// import { useNavigation } from "expo-router";
// import { LoginPostRequest } from "@/Api/Auth/Auth";
// import { useMutation } from "@tanstack/react-query";
// import { useAuthToken } from "@/hooks/useAuthToken";
// const Logo = require("../../assets/Icons/logo-dark.png");
// const Mail = require("../../assets/Icons/mail.png");
// const Lock = require("../../assets/Icons/lock.png");

// export default function SignIn() {
//   const { userId } = useAuthToken();
//   const navigation: any = useNavigation();

//   const mutation = useMutation({
//     mutationFn: (body: loginType) => {
//       return LoginPostRequest(body);
//     },
//     onSuccess: () => {
//       navigation.navigate("(user)");
//     },
//     onError() {
//       Alert.alert(
//         "Warning",
//         "Make sure your credentials are correct or contact support."
//       );
//     },
//   });

//   const { isPending, isError, isSuccess } = mutation;

//   const [login, setlogin] = useState<loginType["login"]>("");
//   const [password, setPasswored] = useState<loginType["password"]>("");

//   const handleSignIn = async () => {
//     let body = {
//       login: login,
//       password: password,
//     };

//     if (login && password) {
//       await mutation.mutateAsync(body);
//     } else {
//       Alert.alert("Warning", "Please enter both email and password.");
//     }
//   };

//   useEffect(() => {
//     // console.log("+++++++++++++++++++++++++++++++++++++++");
//     if (userId) {
//       navigation.navigate("(user)");
//     }
//   }, [userId]);

//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const formHeight = useRef(new Animated.Value(0.7)).current;
//   const formBorderRadius = useRef(new Animated.Value(1)).current;
//   const headerOpacity = useRef(new Animated.Value(1)).current;
//   const logoOpacity = useRef(new Animated.Value(1)).current;
//   const footerOpacity = useRef(new Animated.Value(1)).current;
//   const innerPadding = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       () => {
//         setKeyboardVisible(true);
//         Animated.parallel([
//           Animated.timing(formHeight, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(formBorderRadius, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(headerOpacity, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(logoOpacity, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(footerOpacity, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(innerPadding, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//         ]).start();
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       () => {
//         setKeyboardVisible(false);
//         Animated.parallel([
//           Animated.timing(formHeight, {
//             toValue: 0.7,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(formBorderRadius, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(headerOpacity, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(logoOpacity, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(footerOpacity, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//           Animated.timing(innerPadding, {
//             toValue: 20,
//             duration: 300,
//             useNativeDriver: false,
//           }),
//         ]).start();
//       }
//     );

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);

//   let formWrapperStyle = {
//     height: formHeight.interpolate({
//       inputRange: [0.7, 1],
//       outputRange: ["70%", "100%"],
//     }),
//     borderTopLeftRadius: formBorderRadius.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 90],
//     }),
//     borderTopRightRadius: formBorderRadius.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 90],
//     }),
//     borderBottomLeftRadius: formBorderRadius.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 20],
//     }),
//     borderBottomRightRadius: formBorderRadius.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 90],
//     }),
//   };
//   let innerStyle = {
//     padding: innerPadding.interpolate({
//       inputRange: [0, 20],
//       outputRange: [0, 20],
//     }),
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <TouchableWithoutFeedback
//         style={{ width: "100%" }}
//         onPress={Keyboard.dismiss}
//       >
//         <Animated.View style={[styles.inner, innerStyle]}>
//           {!isKeyboardVisible && (
//             <View style={styles.headerTitle}>
//               <Text style={{ fontSize: 26, fontWeight: "900" }}>
//                 Welcome Back
//               </Text>
//               <Text style={{ fontSize: 18 }}>Login back into your account</Text>
//             </View>
//           )}

//           <Animated.View style={[styles.formWrapper, formWrapperStyle]}>
//             <Animated.View
//               style={[
//                 {
//                   opacity: logoOpacity,
//                   position: "absolute",
//                   top: -70,
//                   right: 20,
//                   zIndex: 100,
//                 },
//               ]}
//             >
//               <Image style={styles.Logo} source={Logo} />
//             </Animated.View>
//             <Text style={styles.title}>Login</Text>
//             {isPending && <ActivityIndicator />}
//             <View style={{ position: "relative", paddingBottom: 6 }}>
//               <AuthInput
//                 image={Mail}
//                 value={login}
//                 onChange={setlogin}
//                 placeHolder="E-mail"
//               />

//               <AuthInput
//                 image={Lock}
//                 value={password}
//                 onChange={setPasswored}
//                 placeHolder="Password"
//                 type={true}
//               />
//               <Text
//                 style={styles.forgotPass}
//                 onPress={() => navigation.navigate(`Forgot Password`)}
//               >
//                 Forgot Password?
//               </Text>
//             </View>
//             <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//               <Text style={styles.buttonText}>LOGIN</Text>
//             </TouchableOpacity>
//           </Animated.View>
//         </Animated.View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     height: "100%",
//     width: "100%",
//     backgroundColor: "#89cff0",
//     alignItems: "center",
//   },
//   inner: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "white",
//     width: "100%",
//   },
//   headerTitle: {
//     marginRight: 10,
//     marginBottom: 60,
//     width: "100%",
//   },
//   Logo: {
//     width: 150,
//     height: 150,
//   },
//   formWrapper: {
//     position: "relative",
//     backgroundColor: "#2c8ffa",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderTopLeftRadius: 90,
//     borderTopRightRadius: 90,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 90,
//     width: "100%",
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//     marginRight: 170,
//     marginBottom: 40,
//   },
//   button: {
//     backgroundColor: "white",
//     color: "black",
//     marginTop: 10,
//     padding: 15,
//     borderRadius: 50,
//     width: "80%",
//   },
//   buttonText: {
//     color: "black",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   logInTextWrapper: {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "row",
//     marginBottom: 30,
//   },
//   forgotPass: {
//     position: "absolute",
//     top: 155,
//     right: 20,
//     color: "white",
//     width: "95%",
//     textAlign: "right",
//     fontSize: 15,
//     fontWeight: "700",
//   },
//   joinNow: {
//     fontSize: 18,
//     color: "#2c8ffa",
//     fontWeight: "800",
//   },
// });

import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AuthInput from "@/components/Input/AuthInput";
import { loginType } from "@/types/Auth-types";
import { useNavigation } from "expo-router";
import { LoginPostRequest } from "@/Api/Auth/Auth";
import { useMutation } from "@tanstack/react-query";
import { useAuthToken } from "@/hooks/useAuthToken";
import * as SecureStore from "expo-secure-store";

const Logo = require("../../assets/Icons/logo-dark.png");
const Mail = require("../../assets/Icons/mail.png");
const Lock = require("../../assets/Icons/lock.png");

export default function SignIn() {
  const { userId } = useAuthToken();
  const navigation: any = useNavigation();

  const mutation = useMutation({
    mutationFn: (body: loginType) => {
      return LoginPostRequest(body);
    },
    onSuccess: () => {
      navigation.navigate("(user)");
    },
    onError() {
      Alert.alert(
        "Warning",
        "Make sure your credentials are correct or contact support."
      );
    },
  });

  const { isPending, isError, isSuccess } = mutation;

  const [login, setlogin] = useState<loginType["login"]>("");
  const [password, setPasswored] = useState<loginType["password"]>("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedCredentials = await SecureStore.getItemAsync("credentials");
        if (storedCredentials !== null) {
          const { login, password } = JSON.parse(storedCredentials);
          setlogin(login);
          setPasswored(password);
          setRememberMe(true);
        }
      } catch (error) {
        console.log("Error loading credentials:", error);
      }
    };
    loadCredentials();
  }, []);

  const handleSignIn = async () => {
    let body = {
      login: login,
      password: password,
    };

    if (login && password) {
      if (rememberMe) {
        try {
          await SecureStore.setItemAsync(
            "credentials",
            JSON.stringify({ login, password })
          );
        } catch (error) {
          console.log("Error saving credentials:", error);
        }
      } else {
        try {
          await SecureStore.deleteItemAsync("credentials");
        } catch (error) {
          console.log("Error removing credentials:", error);
        }
      }
      await mutation.mutateAsync(body);
    } else {
      Alert.alert("Warning", "Please enter both email and password.");
    }
  };

  useEffect(() => {
    // console.log("+++++++++++++++++++++++++++++++++++++++");
    if (userId) {
      navigation.navigate("(user)");
    }
  }, [userId]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const formHeight = useRef(new Animated.Value(0.7)).current;
  const formBorderRadius = useRef(new Animated.Value(1)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const footerOpacity = useRef(new Animated.Value(1)).current;
  const innerPadding = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        Animated.parallel([
          Animated.timing(formHeight, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(formBorderRadius, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(footerOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(innerPadding, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        Animated.parallel([
          Animated.timing(formHeight, {
            toValue: 0.7,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(formBorderRadius, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(footerOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(innerPadding, {
            toValue: 20,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  let formWrapperStyle = {
    height: formHeight.interpolate({
      inputRange: [0.7, 1],
      outputRange: ["70%", "100%"],
    }),
    borderTopLeftRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 90],
    }),
    borderTopRightRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 90],
    }),
    borderBottomLeftRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    }),
    borderBottomRightRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 90],
    }),
  };
  let innerStyle = {
    padding: innerPadding.interpolate({
      inputRange: [0, 20],
      outputRange: [0, 20],
    }),
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        style={{ width: "100%" }}
        onPress={Keyboard.dismiss}
      >
        <Animated.View style={[styles.inner, innerStyle]}>
          {!isKeyboardVisible && (
            <View style={styles.headerTitle}>
              <Text style={{ fontSize: 26, fontWeight: "900" }}>
                Welcome Back
              </Text>
              <Text style={{ fontSize: 18 }}>Login back into your account</Text>
            </View>
          )}

          <Animated.View style={[styles.formWrapper, formWrapperStyle]}>
            <Animated.View
              style={[
                {
                  opacity: logoOpacity,
                  position: "absolute",
                  top: -70,
                  right: 20,
                  zIndex: 100,
                },
              ]}
            >
              <Image style={styles.Logo} source={Logo} />
            </Animated.View>
            <Text style={styles.title}>Login</Text>
            {isPending && <ActivityIndicator />}
            <View style={{ position: "relative", paddingBottom: 6 }}>
              <AuthInput
                image={Mail}
                value={login}
                onChange={setlogin}
                placeHolder="E-mail"
              />

              <AuthInput
                image={Lock}
                value={password}
                onChange={setPasswored}
                placeHolder="Password"
                type={true}
              />
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    {rememberMe && <Text style={styles.checkboxTick}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>Remember Me</Text>
                </View>
                <Text
                  style={styles.forgotPass}
                  onPress={() => navigation.navigate(`Forgot Password`)}
                >
                  Forgot Password?
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#89cff0",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    width: "100%",
  },
  headerTitle: {
    marginRight: 10,
    marginBottom: 60,
    width: "100%",
  },
  Logo: {
    width: 150,
    height: 150,
  },
  formWrapper: {
    position: "relative",
    backgroundColor: "#2c8ffa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 90,
    width: "100%",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginRight: 170,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "white",
    color: "black",
    marginTop: 10,
    padding: 15,
    borderRadius: 50,
    width: "80%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  logInTextWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
  forgotPass: {
    position: "absolute",
    top: 10,
    right: 5,
    color: "white",
    // width: "95%",
    textAlign: "right",
    fontSize: 15,
    fontWeight: "700",
  },
  joinNow: {
    fontSize: 18,
    color: "#2c8ffa",
    fontWeight: "800",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    left: 5,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  checkboxChecked: {
    // backgroundColor: "#4630EB",
  },
  checkboxTick: {
    color: "#fff",
    fontSize: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
