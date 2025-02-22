import { Colors } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import * as Application from "expo-application";
import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "./CustomText";

const PrivacyTerms = () => {
  const openPrivacyPolicy = () => {
    const url =
      "https://www.termsfeed.com/live/b9b83488-3035-4933-af3e-8cc8e964e4b4";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Privacy Policy URL:", err)
    );
  };

  const { colors: theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        {
          bottom: bottom + 10,
          borderColor: theme.gray[200],
          backgroundColor: theme.background,
        },
      ]}
    >
      <CustomText
        variant="h6"
        style={[styles.versionCodeText, { color: theme.gray[500] }]}
      >
        v{Application.nativeApplicationVersion}
      </CustomText>

      <CustomText>By using, you agree to our</CustomText>
      <TouchableOpacity
        hitSlop={10}
        activeOpacity={0.8}
        style={styles.footerTextContainer}
        onPress={openPrivacyPolicy}
      >
        <CustomText style={styles.footerText}>Terms of service</CustomText>
        <CustomText style={styles.footerText}>Privacy Policy</CustomText>
        <CustomText style={styles.footerText}>Content Policy</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default PrivacyTerms;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    borderTopWidth: 1,
    zIndex: 22,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  footerTextContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    flexWrap: "wrap",
  },
  footerText: {
    textDecorationLine: "underline",
    fontSize: RFValue(10),
    color: Colors.primary,
  },
  versionCodeText: {
    textAlign: "center",
    marginVertical: 5,
  },
});
