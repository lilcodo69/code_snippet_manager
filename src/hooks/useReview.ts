import { useQuery } from "@tanstack/react-query";
import { reviewSnippet } from "../services/supabase";

interface ReviewSnippetData {
  review: string;
}

export const useReview = (code: string, enabled: boolean) => {
  return useQuery<ReviewSnippetData, Error>({
    queryKey: ["codeReview", code],
    queryFn: () => reviewSnippet(code),
    enabled: enabled,            
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
