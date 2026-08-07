import {
  useSuspenseQuery,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

const useBookmarks = (keyName, serviceName, page, limit = 6) => {
  return useSuspenseQuery({
    queryKey: [`${keyName}`],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await serviceName;
      console.log("ress  ", response);
      return response.data.data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchMount: true,
  });
};

export default useBookmarks;
