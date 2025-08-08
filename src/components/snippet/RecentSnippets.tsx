// components/snippet/RecentSnippets.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDeleteSnippet } from '../../hooks/useDeleteSnippet';
import { useUpdateSnippet } from '../../hooks/useUpdateSnippet';
import type { CodeSnippet } from '../../type';
import { SnippetCard } from './snippets';
import { SnippetForm } from './SnippetForm';

interface RecentSnippetsProps {
  snippets?: CodeSnippet[];
  isLoading?: boolean;
  error?: Error | null;
}

const RecentSnippets = ({ snippets, isLoading, error }: RecentSnippetsProps) => {
  const { user } = useAuth();
  const { mutate: updatePinStatus } = useUpdateSnippet();
  const { mutate: deleteSnippet } = useDeleteSnippet();
  
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);

  const handlePin = (id: string) => {
    const snippet = snippets?.find(s => s.id === id);
    if (snippet) {
      updatePinStatus({ id, updates: { is_pinned: !snippet.is_pinned } });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      deleteSnippet(id);
    }
  };

  const handleEdit = (snippet: CodeSnippet) => setEditingSnippet(snippet);
  const handleCloseEdit = () => setEditingSnippet(null);

  if (!user) {
    return (
      <div className="bg-blue-800 p-4 rounded-lg text-white text-center">
        Please log in to see your snippets.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center text-white">Loading recent snippets...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading snippets: {error.message}
      </div>
    );
  }

  return (
    <div>
      {editingSnippet && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <SnippetForm initialSnippet={editingSnippet} onClose={handleCloseEdit} />
        </div>
      )}

      <div className="" >
        <h3 className="text-2xl font-bold text-white mb-4">Recent Snippets</h3>
        
        {snippets && snippets.length > 0 ? (
          <div className="w-full 
                grid 
                grid-cols-[repeat(1,_27rem)]
                lg:grid-cols-[repeat(3,_27rem)]
                gap-x-[1.3rem]
                gap-y-[1.4rem]
                sm:grid-cols-[repeat(2,_27rem)]
              

                mx-auto                        
                px-4                           
                ">
            {snippets.map(snippet => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onPin={handlePin}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg mb-4">No snippets yet.</p>
            <p className="text-gray-500">Create your first code snippet to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentSnippets;