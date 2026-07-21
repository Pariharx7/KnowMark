import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { AuthService } from "@features/authentication";

const useAuthStatus = () => {
  // return useQuery({
  return useSuspenseQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const response = await AuthService.checkAuthStatus();
      console.log(response.data.data.authenticated);
      return response.data.data.authenticated;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    onError: (error) => {
      console.error("Error fetching authentication status:", error);
    },
  });
};

export default useAuthStatus;
