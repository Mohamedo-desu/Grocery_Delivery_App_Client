import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import { tokenStorage } from "@/store/storage";
import axios from "axios";
import axiosInstance from "./apiInterceptors";

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });

    const { accessToken, refreshToken, customer } = response.data;
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refreshToken);

    const { setUser } = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    throw error;
  }
};
export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken, deliveryPartner } = response.data;
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refreshToken);

    const { setUser } = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    throw error;
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await axiosInstance.get("/user");

    setUser(response.data.user);
  } catch (error) {
    throw error;
  }
};

export const updateUserLocation = async (data: any, setUser: any) => {
  try {
    const response = await axiosInstance.patch("/user", data);
    refetchUser(setUser);
  } catch (error) {
    console.log(error);
  }
};
