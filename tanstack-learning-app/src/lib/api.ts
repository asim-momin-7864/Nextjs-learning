// fake api

import axios from "axios";
import type { Post } from "./schema";
import { useAuthStore } from "../../store/use-auth-store";

// axios instance
export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // get token from store
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // if request setup falls, invalid config
    return Promise.reject(error);
  },
);

// type fetcher function

// fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/posts", {
    params: { _limit: 8 },
  });
  return response.data;
};

// create posts func
export const createPost = async (payload: Omit<Post, "id">): Promise<Post> => {
  const res = await apiClient.post<Post>("/posts", payload);
  return res.data;
};
