import { supabase } from "../supabaseClient";
import type { CodeSnippet, SnippetSearchResult ,CodeSnippetPayload } from "../type/index";

export const getAllSnippets = async (
  userId: string
): Promise<CodeSnippet[]> => {
  const { data, error } = await supabase
    .from("codesnippet")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching snippets from Supabase:", error);
    throw new Error(error.message);
  }

  return data || [];
};

export const insertSnippet = async (
  snippet: Omit<CodeSnippetPayload, "id" | "created_at" >
): Promise<CodeSnippet> => {
  const { data, error } = await supabase
    .from("codesnippet")
    .insert([snippet])
    .select() 
    .single();

  if (error) {
    console.error("Error inserting snippet into Supabase:", error);
    throw new Error(error.message);
  }

  return data;
};

export const updateSnippet = async (
  id: string,
  updates: Partial<CodeSnippetPayload>
): Promise<CodeSnippet> => {
  const { data, error } = await supabase
    .from("codesnippet")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating snippet in Supabase:", error);
    throw new Error(error.message);
  }
  return data;
};

export const deleteSnippet = async (id: string): Promise<void> => {
  const { error } = await supabase.from("codesnippet").delete().eq("id", id);

  if (error) {
    console.error("Error deleting snippet from Supabase:", error);
    throw new Error(error.message); 
  }

  return;
};


export const invokeEmbedFunction = async (inputText: string): Promise<number[]> => {
  const { data, error } = await supabase.functions.invoke('embed', {
    body: { inputText },
  });
  if (error) throw error;
  return data.embedding;
}

export const matchCodeSnippets = async (embedding: number[]): Promise<SnippetSearchResult[]> => {
  const { data, error } = await supabase.rpc('match_code_snippets', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 5,
  });
  if (error) throw error;
  return data || [];
}


export const reviewSnippet = async({ codeToReview }: { codeToReview: string }):Promise<string>=>{
  const {data,error} = await supabase.functions.invoke('reviewSnippetCode',{
    body:{codeToReview},
  })
  if(error) throw error;
  return data.review;

}