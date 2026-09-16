import {
  useSuspenseQuery,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

const useBookmarks = (keyName, serviceName, page, limit = 6) => {
  return useSuspenseQuery({
    queryKey: [`${keyName}`],
    queryFn: async () => {
      const response = await serviceName;
      return response.data.data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchMount: true,
  });
};

export default useBookmarks;
