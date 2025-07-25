
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("Edge Function 'embed' (using Google AI) is ready to run.");

const API_KEY = Deno.env.get("GOOGLE_API_KEY");

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log(req);
  
  try {
    const { inputText } = await req.json();
    if (!inputText) {
      throw new Error("No inputText provided in the request body.");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    const result = await model.embedContent(inputText);
    const embedding = result.embedding.values; 

    if (!embedding) {
        throw new Error("Failed to generate embedding.");
    }

    return new Response(
      JSON.stringify({ embedding }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } 
 catch (error) {
    
    console.error("Error inside Edge Function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    return new Response(
      JSON.stringify({ 
          error: "An error occurred in the Edge Function.",
          details: errorMessage,
          fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)) 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } } // Use 500 for server errors
    )
}
});

