import { supabase } from "../supabaseClient";
import type { CodeSnippet } from "../type/index";

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
  snippet: Omit<CodeSnippet, "id" | "created_at" | "embedding_vectors">
): Promise<CodeSnippet> => {
  const { data, error } = await supabase
    .from("codesnippet")
    .insert([snippet])
    .select() // Use .select() to return the inserted row
    .single();

  if (error) {
    console.error("Error inserting snippet into Supabase:", error);
    throw new Error(error.message);
  }

  return data;
};

export const updateSnippet = async (
  id: string,
  updates: Partial<CodeSnippet>
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
    throw new Error(error.message); // Throw for React Query
  }

  return;
};
