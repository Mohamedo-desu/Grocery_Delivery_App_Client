import { NoticeHeight } from "@/utils/scaling";
import { withCollapsibleContext } from "@r0b0t3d/react-native-collapsible";
import React, { useEffect, useRef } from "react";
import { Alert, Animated as RNAnimated, StyleSheet } from "react-native";

import NoticeAnimation from "@/components/dashboard/NoticeAnimation";
import Visuals from "@/components/dashboard/Visuals";
import { reverseGeocode } from "@/service/mapService";
import { useAuthStore } from "@/store/authStore";
import * as Location from "expo-location";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const { setUser } = useAuthStore();

  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const updateUser = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "We need location access to provide a better shopping experience."
          );
          return;
        }

        let { latitude, longitude } = (
          await Location.getCurrentPositionAsync({})
        ).coords;
        reverseGeocode(latitude, longitude, setUser);
      } catch (error) {}
    };
    slideDown();
    updateUser();
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
      </>
    </NoticeAnimation>
  );
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  backToTopButton: {
    position: "absolute",
    alignSelf: "center",
    top: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});
