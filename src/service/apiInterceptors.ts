import { BASE_URL } from "@/constants";
import { tokenStorage } from "@/store/storage";
import axios from "axios";
import { refreshTokens } from "./config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = tokenStorage.getString("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken } = await refreshTokens();

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("ERROR REFRESHING TOKEN");
      }
    }
    if (error.response && error.response.status != 401) {
      console.log(error.response.data.message);
    }

    return Promise.resolve(error);
  }
);

export default axiosInstance;
