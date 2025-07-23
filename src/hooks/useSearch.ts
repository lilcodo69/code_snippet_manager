// hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query';
import { invokeEmbedFunction, matchCodeSnippets } from '../services/supabase';
import type { SnippetSearchResult } from '../type';


export function useSearch(searchQuery: string) {
  return useQuery<SnippetSearchResult[], Error>({
    queryKey: ['snippetSearch', searchQuery],
    enabled: searchQuery.trim().length > 0,

    queryFn: async () => {
      if (!searchQuery.trim()) return [];

      const embedding = await invokeEmbedFunction(searchQuery);
      const results = await matchCodeSnippets(embedding);

      return results;
    },

      placeholderData: (previousData) => previousData,

  });
}
