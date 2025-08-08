// import React, { useState } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { getAllSnippets } from "../../services/supabase";
// import { useAuth } from '../../context/AuthContext'; 
// import { useDeleteSnippet } from '../../hooks/useDeleteSnippet'; 
// import { useUpdateSnippet } from '../../hooks/useUpdateSnippet';
// import type { CodeSnippet } from "../../type";
// import { SnippetCard } from "./snippets";
// import { SnippetForm } from "./SnippetForm";

// const SnippetList = () => {
//     const { user, isLoading: isAuthLoading } = useAuth();
//     const { mutate: updatePinStatus } = useUpdateSnippet();
//     const { mutate: deleteSnippet } = useDeleteSnippet();

//     const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);

//     const { data: snippets, error, isLoading: isSnippetsLoading, isError } = useQuery<CodeSnippet[], Error>({
//         queryKey: ['snippets', user?.id],
//         queryFn: () => getAllSnippets(user!.id), 
//         enabled: !!user,
//     });

//     const handlePin = (id: string) => {
//         const snippet = snippets?.find(s => s.id === id);
//         if (snippet) {
//             updatePinStatus({ id, updates: { is_pinned: !snippet.is_pinned } });
//         }
//     };

//     const handleDelete = (id: string) => {
//         if (window.confirm("Are you sure you want to delete this snippet?")) {
//             deleteSnippet(id);
//         }
//     };

//     const handleEdit = (snippet: CodeSnippet) => setEditingSnippet(snippet);
//     const handleCloseEdit = () => setEditingSnippet(null);

    

//     if (isAuthLoading) {
//         return <div className="text-center text-gray-400">Authenticating...</div>;
//     }

//     if (!user) {
//         return <div className="bg-blue-800 p-4 rounded-lg text-white text-center">Please log in to see your snippets.</div>;
//     }
    
//     if (isSnippetsLoading) {
//         return <div className="text-center text-white">Loading snippets...</div>;
//     }

//     if (isError) {
//         return <div className="text-red-500 text-center">Error loading snippets: {error.message}</div>;
//     }

//     return (
//         <div>
//             {editingSnippet && (
//                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 ">
//                      <SnippetForm initialSnippet={editingSnippet} onClose={handleCloseEdit} />
//                 </div>
//             )}

//             <div>
//                 {snippets && snippets.length > 0 ? (
//                     snippets.map(snippet => (
//                         <SnippetCard
//                             key={snippet.id}
//                             snippet={snippet}
//                             onPin={handlePin}
//                             onDelete={handleDelete}
//                             onEdit={handleEdit}
//                         />
//                     ))
//                 ) : (
//                     <p className="text-gray-400 text-center">No snippets yet. Go create one!</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SnippetList;