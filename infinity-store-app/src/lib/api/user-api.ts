import axios from "axios";
import { useAuthStore } from "@/store/use-auth-store";
import { LoginResponseSchema, UserProfileSchema } from "@/lib/schemas/auth";
import type {
  UserInputType,
  UserProfileType,
  LoginResponseType,
} from "@/lib/schemas/auth";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: inject Bearer token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. Login fetcher
export const loginRequest = async (
  credentials: UserInputType,
): Promise<LoginResponseType> => {
  const response = await api.post("/auth/login", credentials);
  return LoginResponseSchema.parse(response.data);
};

// 2. Auth/me fetcher
export const fetchMe = async (): Promise<UserProfileType> => {
  const response = await api.get("/auth/me");
  return UserProfileSchema.parse(response.data);
};
