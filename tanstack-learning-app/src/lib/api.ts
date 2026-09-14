// fake api

import axios from "axios";
import type { Post } from "./schema";
import { useAuthStore } from "../../store/use-auth-store";

// Create an Axios instance with base configuration
export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to the Axios instance
// This function runs before every request is sent
apiClient.interceptors.request.use(
  function (config) {
    // Get the current state from the auth store
    const authState = useAuthStore.getState();
    
    // Get the token from the auth state
    const token = authState.token;

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified configuration
    return config;
  },
  function (error) {
    // If request setup fails, return a rejected promise
    return Promise.reject(error);
  }
);

// Function to fetch all posts
export async function fetchPosts(): Promise<Post[]> {
  // Define the parameters for the request
  const requestConfig = {
    params: {
      _limit: 8,
    },
  };

  // Make a GET request to the "/posts" endpoint
  const response = await apiClient.get<Post[]>("/posts", requestConfig);
  
  // Return the data from the response
  return response.data;
}

// Function to create a new post
export async function createPost(payload: Omit<Post, "id">): Promise<Post> {
  // Make a POST request to the "/posts" endpoint with the payload
  const response = await apiClient.post<Post>("/posts", payload);
  
  // Return the data from the response
  return response.data;
}
