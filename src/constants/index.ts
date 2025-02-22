export const appName = "Grocery Delivery App";
export const BASE_URL =
  process.env.EXPO_PUBLIC_APP_ENV === "development"
    ? process.env.EXPO_PUBLIC_DEV_BASE_URL
    : process.env.EXPO_PUBLIC_PROD_BASE_URL;
