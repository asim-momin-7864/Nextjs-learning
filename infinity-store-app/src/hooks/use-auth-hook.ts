// tanstack query authentication hook
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { loginRequest, fetchMe } from "@/lib/api/user-api";
import { useAuthStore } from "@/store/use-auth-store";
import type { UserInputType } from "@/lib/schemas/auth";

// fetch operation of user profile

export const fetchProfileQueryOptions = () => {
  const token = useAuthStore.getState().token;

  // options for query
  return queryOptions({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    enabled: Boolean(token), // fetch only user login
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

// hook to use query profile data and chache
export const useUserProfile = () => {
  return useQuery(fetchProfileQueryOptions());
};

// use login
export function useLogin() {
  const queryClient = useQueryClient();

  // get setAuth func so we can use it from store
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    // to login call to loginRequest function from user-api.
    mutationFn: (credentials: UserInputType) => loginRequest(credentials),

    // on success
    onSuccess: (data) => {
      // update zustand store (* in real we dont have to do this)
      setAuth(data);

      // set data to tanstack cache query
      queryClient.setQueryData(["auth", "me"], data);
    },
  });
}
