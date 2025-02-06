import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { FC, ReactNode, useRef } from "react";

type AuthInputType = {
  image: string | any;
  value: string;
  placeHolder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  type?: boolean;
  onFocus?: any;
  onBlur?: any;
};

const AuthInput: FC<AuthInputType> = (data): ReactNode => {
  const { image, value, onChange, placeHolder, type, onFocus, onBlur } = data;
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.inputWrapper}>
        <Image style={styles.icon} source={image} />

        <TextInput
          ref={inputRef}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholderTextColor={"white"}
          style={styles.input}
          placeholder={`${placeHolder}`}
          value={value}
          onChangeText={onChange}
          secureTextEntry={type}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    width: "84%",
    height: 65,
    color: "white",
    borderColor: "#beddfd",
    borderWidth: 2,
    borderRadius: 1,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 40,
  },
  icon: {
    width: 35,
    height: 35,
  },
});

export default AuthInput;
