import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileType, LoginResponseType } from "@/lib/schemas/auth";

interface AuthState {
  token: string | null;
  user: UserProfileType | null;
  setAuth: (data: LoginResponseType) => void;
  setUser: (user: UserProfileType) => void;
  logout: () => void;
}

//
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (data) => {
        const { accessToken, ...userData } = data; // except accessToken ,  rest of keys are collected in userData var
        set({
          token: accessToken,
          user: userData,
        });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "infinity-store-storage",
    },
  ),
);
