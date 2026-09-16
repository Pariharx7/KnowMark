import axios from "axios";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const baseURL = import.meta.env.VITE_API_BE_ALT_URL;

const useFeatures = () => {
  return useSuspenseQuery({
    queryKey: ["feats"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}`);
      return response.data.data;
    },
  });
};

export default useFeatures;
