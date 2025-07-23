
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("Edge Function 'embed' (using Google AI) is ready to run.");

const API_KEY = Deno.env.get("AIzaSyAAC-bprGhGSx-oD6OQU978yb8v-PxjcAA");

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

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
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
});

