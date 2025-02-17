import CustomText from "@/components/global/CustomText";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const index = () => {
  return (
    <View style={styles.screen}>
      <CustomText>Hello</CustomText>
    </View>
  );
};

export default index;

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.Colors.background,
  },
}));
