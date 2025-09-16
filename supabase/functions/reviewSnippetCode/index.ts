import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const API_KEY = Deno.env.get("GOOGLE_API_KEY");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!API_KEY) {
      throw new Error("Google_API_KEY is not set.");
    }

    const data = await req.json();
    console.log("data", data);

    const codeToReview = data.code;

    if (!codeToReview) {
      throw new Error("No 'codeToReview' provided in the request body.");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert AI code reviewer. Your tone is professional and constructive.
Analyze the following code snippet and provide feedback in a structured, easy-to-read format.
Your response must be in Markdown and MUST include the following three sections using H3 (###) headers:
### What's Done Well
- Briefly mention 1-2 positive aspects (e.g., good variable names, clear logic, good use of hooks).
### Potential Issues & Bugs
- Clearly identify any critical bugs, type mismatches, or logical errors. Use bullet points.
- If an issue is a critical concern, make the text **bold**.

### Suggestions for Improvement
- Provide actionable advice on best practices, performance, or readability. Use bullet points.
- When suggesting a code change, include a small, corrected code example in a fenced code block.
Do not provide a long, unstructured wall of text. Keep the analysis concise and focused on the key points.

Here is the code to review:
\`\`\`
${codeToReview}
\`\`\`
`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const reviewText = response.text();

    return new Response(JSON.stringify({ review: reviewText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errormsg =
      error instanceof Error ? error.message : "An unknown error occured";

    console.log("Error in reviewSnippetCode function:", errormsg, error);

    return new Response(
      JSON.stringify({
        error: "An error occurred in the reviewSnippetCode function.",
        details: errormsg,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
