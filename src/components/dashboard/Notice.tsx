import { wavyData } from "@/constants/dummyData";
import { Fonts } from "@/constants/Fonts";
import { NoticeHeight } from "@/utils/scaling";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Defs, G, Path, Svg, Use } from "react-native-svg";
import CustomText from "../ui/CustomText";
const Notice = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{ padding: 10 }}>
            <CustomText
              variant="h6"
              fontFamily={Fonts.SemiBold}
              style={styles.heading}
            >
              It's raining near this location
            </CustomText>
            <CustomText variant="h6" style={styles.textCenter}>
              Our delivery partner may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width={"100%"}
        height={35}
        fill={"#CCD5E4"}
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y={321} />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCD5E4",
  },
  noticeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCD5E4",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  heading: {
    color: "#2D3875",
    marginBottom: 8,
    textAlign: "center",
  },
  wave: {
    width: "100%",
    transform: [{ rotateX: "180deg" }],
  },
});
