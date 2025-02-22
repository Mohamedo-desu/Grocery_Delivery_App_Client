import SplashLogo from "@/assets/images/splash-icon.png";
import { Colors } from "@/constants/Colors";
import { refetchUser } from "@/service/authService";
import { refreshTokens } from "@/service/config";
import { useAuthStore } from "@/store/authStore";
import { tokenStorage } from "@/store/storage";
import { ROLES } from "@/types";
import { screenHeight, screenWidth } from "@/utils/scaling";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import * as TaskManager from "expo-task-manager";
import { jwtDecode } from "jwt-decode";
import { FC, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

const LOCATION_TASK_NAME = "background-location-task";

// Define the task for background location tracking
TaskManager.defineTask(
  LOCATION_TASK_NAME,
  async ({
    data,
    error,
  }: {
    data: { locations: Location.LocationObject[] };
    error: any;
  }) => {
    if (error) {
      console.error("Background location task error:", error);
      return;
    }
    if (data) {
      const { locations } = data;
      // Handle location updates here, e.g., send to server or update app state
    }
  }
);

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  // Function to check token validity
  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString("accessToken") as string;
    const refreshToken = tokenStorage.getString("refreshToken") as string;

    if (accessToken) {
      try {
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

        const currentTime = Date.now() / 1000;

        if (decodedRefreshToken?.exp < currentTime) {
          router.replace("/auth/customer_login");
          Alert.alert("Session Expired", "Please login again");
          return false;
        }

        if (decodedAccessToken?.exp < currentTime) {
          try {
            refreshTokens();
            await refetchUser(setUser);
          } catch (error) {
            console.log(error);
            Alert.alert("There was an error refreshing your token!");
            return false;
          }
        }

        // Redirect user based on their role
        if (user?.role === ROLES.CUSTOMER) {
          router.replace("/protected/product_dashboard");
        } else {
          router.replace("/protected/delivery_dashboard");
        }
      } catch (err) {
        console.error("Token check error:", err);
        tokenStorage.clearAll();
        router.replace("/auth/customer_login");
      }
    } else {
      router.replace("/auth/customer_login");
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        // Request foreground location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "We need location access to provide a better shopping experience."
          );
          return;
        }

        const { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== "granted") {
          Alert.alert(
            "Background Permission Denied",
            "We need background location permission to provide location-based features even when the app is not in use."
          );
          return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 10,
          showsBackgroundLocationIndicator: true,
        });
      } catch (error) {
        console.error("Error requesting location permissions:", error);
      }
    };

    const initializeApp = async () => {
      await fetchUserLocation();
      tokenCheck();
    };

    const timeoutId = setTimeout(initializeApp, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={SplashLogo}
        style={styles.SplashLogoImage}
        contentFit="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  SplashLogoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
  },
});
