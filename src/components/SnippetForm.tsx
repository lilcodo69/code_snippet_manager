// src/components/SnippetForm.tsx
import React, { useState, useEffect } from 'react'; 
import{  useForm, type SubmitHandler }  from "react-hook-form";

import type { CodeSnippet, CreateSnippetFormData } from "../type";
import { useInsertSnippet, useUpdateSnippet } from "../hooks/useSnippet";
import { supabase } from "../supabaseClient"
import type { Session } from '@supabase/supabase-js';

interface SnippetFormProps {
  initialSnippet?: CodeSnippet; 
  onClose: () => void; 
}

type InsertSnippetPayload = Omit<CodeSnippet, 'id' | 'created_at' | 'embedding_vectors'>;
type UpdateSnippetPayload = { id: string, updates: Partial<CodeSnippet> };

export const SnippetForm: React.FC<SnippetFormProps> = ({ initialSnippet, onClose }) => { 
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<CreateSnippetFormData>({
    defaultValues: initialSnippet ? {
      title: initialSnippet.title,
      code: initialSnippet.code,
      language: initialSnippet.language,
      description: initialSnippet.description,
      tags: initialSnippet.tags?.join(', ') || '',
    } : {
      title: '',
      code: '',
      language: '',
      description: '',
      tags: '',
    }
  });


  const { mutate: insertSnippetMutation, isPending: isInserting, isError: isInsertError, error: insertError } = useInsertSnippet();
  const { mutate: updateSnippetMutation, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateSnippet();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    getUserId();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event:unknown, session:Session|null ) => {
      setUserId(session?.user?.id || null);
    });
    return () => { authListener?.subscription?.unsubscribe(); };
  }, []);


  const onSubmit: SubmitHandler<CreateSnippetFormData> = async (data) => {
    if (!userId) {
      alert("User not logged in. Cannot create/update snippet.");
      return;
    }

    const commonSnippetData = {
      title: data.title,
      code: data.code,
      language: data.language,
      description: data.description === '' ? undefined : data.description,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
    };

    if (initialSnippet) {
      const updatePayload: UpdateSnippetPayload = {
        id: initialSnippet.id,
        updates: {
          ...commonSnippetData,
          is_pinned: initialSnippet.is_pinned, 
          user_id: userId, 
        
        }
      };

      updateSnippetMutation(updatePayload, {
        onSuccess: () => {
          alert('Snippet updated successfully!');
          onClose(); 
        },
        onError: (err) => {
          console.error('Failed to update snippet:', err);
          alert(`Error updating snippet: ${err.message}`);
        }
      });

    } else {
      
      const insertPayload: InsertSnippetPayload = {
        ...commonSnippetData,
        user_id: userId,
        is_pinned: false, 
        
      };

      insertSnippetMutation(insertPayload, {
        onSuccess: () => {
          alert('Snippet created successfully!');
          reset(); 
          onClose(); 
        },
        onError: (err) => {
          console.error('Failed to create snippet:', err);
          alert(`Error creating snippet: ${err.message}`);
        }
      });
    }
  };

  const buttonText = initialSnippet ?
    (isSubmitting || isUpdating ? 'Updating...' : 'Save Changes') :
    (isSubmitting || isInserting ? 'Creating...' : 'Create Snippet');

  const isLoading = isSubmitting || isInserting || isUpdating;
  const currentError = isInsertError ? insertError : isUpdateError ? updateError : null;


  if (!userId) {
    return <div className="text-center text-gray-400">Fetching user data...</div>;
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialSnippet ? 'Edit Snippet' : 'Create New Snippet'} 
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600"
          placeholder="e.g., React Hooks Best Practices"
          disabled={isLoading}
        />
        {errors.title && <p className="text-red-500 text-xs italic mt-1">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="code" className="block text-gray-300 text-sm font-bold mb-2">Code</label>
        <textarea
          id="code"
          {...register("code", { required: "Code is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 h-32 font-mono"
          placeholder={`function App() {\n  // your code here\n}`}
          disabled={isLoading}
        ></textarea>
        {errors.code && <p className="text-red-500 text-xs italic mt-1">{errors.code.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="language" className="block text-gray-300 text-sm font-bold mb-2">Language</label>
        <input
          id="language"
          type="text"
          {...register("language", { required: "Language is required" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600"
          placeholder="e.g., javascript, typescript, python"
          disabled={isLoading}
        />
        {errors.language && <p className="text-red-500 text-xs italic mt-1">{errors.language.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Description (Optional)</label>
        <textarea
          id="description"
          {...register("description")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 h-24"
          placeholder="A brief explanation of the code"
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="tags" className="block text-gray-300 text-sm font-bold mb-2">Tags (Comma-separated, Optional)</label>
        <input
          id="tags"
          type="text"
          {...register("tags")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600"
          placeholder="e.g., react, hooks, state, frontend"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>

      <button
        type="button" 
        onClick={onClose}
        disabled={isLoading}
        className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      {currentError && <p className="text-red-500 text-sm mt-3">Error: {currentError?.message}</p>}
    </form>
  );
};

export default SnippetForm;