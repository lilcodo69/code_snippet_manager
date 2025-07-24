

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertSnippet } from '../services/supabase'; 
import type { CodeSnippet, CodeSnippetPayload } from '../type';            
import { useAuth } from '../context/AuthContext';     
type InsertSnippetVariables = Omit<CodeSnippetPayload, 'id' | 'created_at'>;

export const useInsertSnippet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); 

  return useMutation<CodeSnippet, Error, InsertSnippetVariables>({
    mutationFn: insertSnippet,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['snippets', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['recent-snippets', user?.id] });
      
      console.log('Snippet inserted successfully! Cache invalidated for user:', user?.id);
      console.log('Inserted Snippet:', data);
    },

    onError: (error) => {
      console.error('Error inserting snippet:', error);
    },
  });
};