import { NoticeHeight } from "@/utils/scaling";
import React, { FC } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Notice from "./Notice";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<{
  noticePosition: any;
  children: React.ReactElement;
}> = ({ children, noticePosition }) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.noticeContainer,
          { transform: [{ translateY: noticePosition }] },
        ]}
      >
        <Notice />
      </Animated.View>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NOTICE_HEIGHT + 20],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default NoticeAnimation;

const styles = StyleSheet.create({
  noticeContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 999,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
