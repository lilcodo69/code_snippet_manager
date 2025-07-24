import { useQuery } from '@tanstack/react-query';
import { getAllSnippets } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import type { CodeSnippet } from '../type';

export const useRecentSnippets = (limit: number = 7) => {
  const { user } = useAuth();

  return useQuery<CodeSnippet[], Error>({
    queryKey: ['recent-snippets', user?.id, limit],
    queryFn: () => getAllSnippets(user!.id, limit),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, 
  });
};