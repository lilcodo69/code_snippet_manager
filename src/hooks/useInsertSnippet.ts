


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertSnippet } from '../services/supabase';
import type { CodeSnippet } from '../type';
import { useAuth } from '../context/AuthContext'; 

// Define the type for the variables passed to the mutation function
type InsertSnippetVariables = Omit<CodeSnippet, 'id' | 'created_at' | 'embedding_vectors'>;

export const useInsertSnippet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); 

  return useMutation<CodeSnippet, Error, InsertSnippetVariables>({
    mutationFn: insertSnippet, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets', user?.id] });
      console.log('Snippet inserted successfully! Cache invalidated.');
    },
    onError: (error) => {
      console.error('Error inserting snippet:', error);
    },
  });
};