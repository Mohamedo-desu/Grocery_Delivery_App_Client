import { BASE_URL } from "@/constants";
import { tokenStorage } from "@/store/storage";
import axios from "axios";
import { router } from "expo-router";

export const GOOGLE_MAPS_API = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const refreshTokens = async () => {
  try {
    const refreshToken = tokenStorage.getString("refreshToken");

    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    tokenStorage.set("accessToken", newAccessToken);
    tokenStorage.set("refreshToken", newRefreshToken);

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    console.log(error);

    tokenStorage.clearAll();
    router.replace("/auth/customer_login");
    throw error;
  }
};
