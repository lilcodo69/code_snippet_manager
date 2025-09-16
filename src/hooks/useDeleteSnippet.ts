import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSnippet } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

type DeleteSnippetVariables = string; 

export const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<unknown, Error, DeleteSnippetVariables>({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets', user?.id] });
  queryClient.invalidateQueries({ queryKey: ['recent-snippets', user?.id] });

      toast.success('Snippet deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Error deleting snippet: ${error.message}`);
    },
  });
};