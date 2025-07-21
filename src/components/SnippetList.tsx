// src/components/SnippetList.tsx
import { useQuery } from "@tanstack/react-query"
import type { CodeSnippet } from "../type"
import { getAllSnippets } from "../services/supabase"
import { SnippetCard } from "./snippets"
import { useDeleteSnippet, useUpdateSnippet } from "../hooks/useSnippet"
import React, { useState, useEffect } from 'react';
import { supabase } from "../supabaseClient"
import { SnippetForm } from "./SnippetForm"; 
const SnippetList = () => {
    const { mutate: updatePinStatus } = useUpdateSnippet();
    const { mutate: deleteSnippetMutation } = useDeleteSnippet();

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);

    useEffect(() => {
        const getUserId = async () => {
            setAuthLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setCurrentUserId(session.user.id);
            }
            setAuthLoading(false);
        };

        getUserId();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUserId(session?.user?.id || null);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handlePin = (id: string) => {
        // Use strict equality (===) for comparison when types are known
        const currentSnippet = snippets?.find(snippet => snippet.id === id);
        if (currentSnippet) {
            updatePinStatus({
                id: id,
                updates: {
                    is_pinned: !currentSnippet.is_pinned,
                }
            }); // Added semicolon for consistency
        } else {
            console.warn(`Snippet with ID ${id} not found.`);
        }
    }

    const handleDelete = (id: string) => {
        deleteSnippetMutation(id); // Added semicolon for consistency
    }

    const handleEdit = (snippet: CodeSnippet) => {
        setEditingSnippet(snippet);
    }

    const handleCloseEdit = () => {
        setEditingSnippet(null);
    }

    const { data: snippets, error, isLoading, isError } = useQuery<CodeSnippet[], Error>({
        queryKey: ['snippets', currentUserId], // currentUserId is a good dependency
        queryFn: async () => {
            if (!currentUserId) {
                // Return an empty array or throw an error if no user ID,
                // but since enabled is used, this block might be less hit.
                return [];
            }
            const result = await getAllSnippets(currentUserId);
            if (result.error) {
                throw new Error(result.error.message);
            }
            return result.data || [];
        },
        enabled: !!currentUserId && !authLoading, 
    });

    if (authLoading) {
        return <div className="text-center text-gray-400">Loading user session for snippets...</div>;
    }

    if (!currentUserId) {
        return <div className="bg-blue-800 p-4 rounded-lg text-white text-center">Please log in to see your snippets.</div>;
    }

    if (isLoading) {
        return <div className="text-center text-white">Loading snippets...</div>;
    }

    if (isError) {
        return <div className="text-red-500 text-center">Error loading snippets: {error?.message}</div>;
    }

    return (
        <div>
            
            {editingSnippet && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-gray-900 rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={handleCloseEdit}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                        >
                            &times; {/* HTML entity for 'x' mark */}
                        </button>
                        <SnippetForm initialSnippet={editingSnippet} onClose={handleCloseEdit} />
                    </div>
                </div>
            )}

            <div>
                {snippets && snippets.length > 0 ? ( 
                    <>
                        {snippets.map(snippet => (
                            <SnippetCard
                                key={snippet.id}
                                snippet={snippet}
                                onPin={handlePin}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))}
                    </>
                ) : ( 
                    <p className="text-gray-400 text-center">No snippets to show for your account yet. Create one!</p>
                )}
            </div>
        </div>
    )
}

export default SnippetList;