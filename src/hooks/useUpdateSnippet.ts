import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSnippet } from '../services/supabase';
import type { CodeSnippet, CodeSnippetPayload } from '../type';
import { useAuth } from '../context/AuthContext';

type UpdateSnippetVariables = { id: string; updates: Partial<CodeSnippetPayload> };

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<CodeSnippet, Error, UpdateSnippetVariables>({
    mutationFn: ({ id, updates }) => updateSnippet(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets', user?.id] });
      console.log('Snippet updated successfully! Cache invalidated.');
    },
    onError: (error) => {
      console.error('Error updating snippet:', error.message);
    },
  });
};