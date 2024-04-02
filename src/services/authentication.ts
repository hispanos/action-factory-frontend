import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "./types/login";

const API_URL = import.meta.env.VITE_API_URL

export const login = async (email: string, password: string) => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};
