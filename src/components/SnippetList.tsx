// src/components/SnippetList.tsx
import { useQuery } from "@tanstack/react-query"
import type { CodeSnippet } from "../type"
import { getAllSnippets } from "../services/supabase"
import { SnippetCard } from "./snippets"
import { useDeleteSnippet, useUpdateSnippet } from "../hooks/useSnippet"
import React, { useState, useEffect } from 'react'; 
import { supabase } from "../supabaseClient"

const SnippetList = () => {
    const { mutate: updatePinStatus } = useUpdateSnippet();
    const { mutate: deleteSnippetMutation } = useDeleteSnippet();

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

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
            authListener?.unsubscribe();
        };
    }, []);

    const handlePin = (id: string) => {
        const currentSnippet = snippets?.find(snippet => snippet.id == id);
        if (currentSnippet) {
            updatePinStatus({
                id: id,
                updates: {
                    is_pinned: !currentSnippet.is_pinned,
                }
            })
        } else {
            console.warn(`Snippet with ID ${id} not found.`);
        }
    }

    const handleDelete = (id: string) => {
        deleteSnippetMutation(id)
    }

    const { data: snippets, error, isLoading, isError } = useQuery<CodeSnippet[], Error>({
        queryKey: ['snippets', currentUserId], // Add currentUserId to queryKey
        queryFn: async () => {
            if (!currentUserId) {

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
            {snippets && snippets?.length > 0 ? (
                <>
                    {snippets.map(snippet => (
                        <SnippetCard key={snippet.id} snippet={snippet} onPin={handlePin} onDelete={handleDelete} />
                    ))}
                </>
            ) : <p className="text-gray-400 text-center">No snippets to show for your account yet. Create one!</p>
            }
        </div>
    )
}

export default SnippetList;