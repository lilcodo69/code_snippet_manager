import { useMutation } from "@tanstack/react-query"
import { reviewSnippet } from "../services/supabase";

type ReviewSnippetVariables = string; 

type ReviewSnippetData = { review: string };
const useReview=()=>{
    return(
        useMutation<ReviewSnippetData,Error,ReviewSnippetVariables>({
         mutationFn:reviewSnippet,

     onError:(error)=>{
         console.log("error",error)
                        
     },
        })
    )

}

export default useReview;