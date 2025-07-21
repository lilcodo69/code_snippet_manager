import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSnippet } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

type DeleteSnippetVariables = string; // The ID of the snippet to delete

export const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<any, Error, DeleteSnippetVariables>({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets', user?.id] });
      console.log('Snippet deleted successfully! Cache invalidated.');
    },
    onError: (error) => {
      console.error('Error deleting snippet:', error.message);
    },
  });
};