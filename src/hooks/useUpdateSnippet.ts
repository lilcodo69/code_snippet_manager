import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSnippet } from '../services/supabase';
import type { CodeSnippet, CodeSnippetPayload } from '../type';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

type UpdateSnippetVariables = { id: string; updates: Partial<CodeSnippetPayload> };

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<CodeSnippet, Error, UpdateSnippetVariables>({
    mutationFn: ({ id, updates }) => updateSnippet(id, updates),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['recent-snippets', user?.id] });

    },
    
    onError: (error) => {
      toast.error(`Error updating snippet:, ${error.message}`);
    },
  });
};