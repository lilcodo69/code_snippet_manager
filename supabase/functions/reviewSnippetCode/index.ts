import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const API_KEY = Deno.env.get("GOOGLE_API_KEY");


serve(async (req)=>{
  if(req.method === 'OPTIONS'){
    return new Response('ok',{headers:corsHeaders});
  }


try{

  if(!API_KEY){
    throw new Error("Google_API_KEY is not set.");
  
  }

      const data= await req.json();
      const codeToReview=data.codeToReview;

        if (!codeToReview) {
      throw new Error("No 'codeToReview' provided in the request body.");
    }

        const genAI = new GoogleGenerativeAI(API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an expert code reviewer. Provide a brief, constructive analysis of the following code snippet. Focus on potential bugs, best practices, and suggestions for improvement. Format your response using markdown. Code:\n\n\`\`\`\n${codeToReview}\n\`\`\``;

        const result = await model.generateContent(prompt);
    const response = result.response;
    const reviewText = response.text();

    return new Response(
      JSON.stringify({review:reviewText}),
      {headers:{...corsHeaders,"Content-Type":"application/json"}}
    )

}

catch(error){
const errormsg = error instanceof Error ? error.message:"An unknown error occured";

console.log("Error in reviewSnippetCode function:", errormsg,error);

 return new Response(
      JSON.stringify({ 
          error: "An error occurred in the reviewSnippetCode function.",
          details: errorMessage,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }


}
)