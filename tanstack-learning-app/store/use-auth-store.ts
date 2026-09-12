// fake auth storing logic (in real this is handle by auth backend and chrome cookies)

import { create } from "zustand";

// type for zustand store
interface AuthState {
  token: string | null;

  // simulate login
  setToken: (token: string) => void;

  // simulate logout
  clearToken: () => void;
}

// auth store
export const useAuthStore = create<AuthState>()((set) => ({
  token: "dummy-jwt-token",
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));
