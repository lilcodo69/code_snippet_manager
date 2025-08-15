import { useMutation } from "@tanstack/react-query"
import { reviewSnippet } from "../services/supabase";

type ReviewSnippetVariables = string;
type ReviewSnippetData = { review: string };
const useReview = () => {
    console.log("review logged");
    
    return useMutation<ReviewSnippetData, Error, ReviewSnippetVariables>({
        mutationFn: (code) => reviewSnippet(code), // Fixed: destructure the variables
        onError: (error) => {
            console.log("error", error);
        },
    });
}

export default useReview;