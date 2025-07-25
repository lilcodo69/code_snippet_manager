
import React from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";

import type { CodeSnippet, CreateSnippetFormData } from "../../type";

import { useUpdateSnippet } from "../../hooks/useUpdateSnippet";
import { useAuth } from '../../context/AuthContext';
import { invokeEmbedFunction } from '../../services/supabase';

import { useInsertSnippet } from '../../hooks/useInsertSnippet';
interface SnippetFormProps {
  initialSnippet?: CodeSnippet; 
  onClose?: () => void; 
}

export const SnippetForm: React.FC<SnippetFormProps> = ({ initialSnippet, onClose }) => { 
  const { user } = useAuth();

  const { register, handleSubmit, reset, formState: { errors ,isSubmitting }  } = useForm<CreateSnippetFormData>({
    defaultValues: initialSnippet ? {
      title: initialSnippet.title,
      code: initialSnippet.code,
      language: initialSnippet.language,
      description: initialSnippet.description,
      tags: Array.isArray(initialSnippet.tags) ? initialSnippet.tags.join(', ') : '', 
    } : {
      title: '',
      code: '',
      language: '',
      description: '',
      tags: '',
    }
  });

  const { mutate: insertSnippet, isPending: isInserting, error: insertError } = useInsertSnippet();
  const { mutate: updateSnippet, isPending: isUpdating, error: updateError } = useUpdateSnippet();

   const onSubmit: SubmitHandler<CreateSnippetFormData> = async (data) => {
    if (!user) {
      alert("User not logged in.");
      return;
    }

    try {
        const contentToEmbed = `Title: ${data.title}\nLanguage: ${data.language}\nCode: ${data.code}`;
        console.log("Generating embedding for content...");
        const embeddingArray  = await invokeEmbedFunction(contentToEmbed);
        console.log("Embedding generated successfully.");

        const snippetPayload = {
          title: data.title,
          code: data.code,
          language: data.language,
          description: data.description || undefined,
          tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
          user_id: user.id,
          embedding_vectors: embedding, 
        };

        if (initialSnippet) {
          updateSnippet({
            id: initialSnippet.id,
            updates: snippetPayload 
          }, {
            onSuccess: () => {
              alert('Snippet updated successfully!');
              onClose?.();
            }
          });
        } else {
          insertSnippet({
            ...snippetPayload,
            is_pinned: false,
          }, {
            onSuccess: () => {
              alert('Snippet created successfully!');
              reset();
              onClose?.();
            }
          });
        }

    } catch (error) {

        console.error("Failed to generate embedding or save snippet:", error);
        if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
    }
        else {
        alert('An unexpected error occurred. Please check the console.');
    }
    }
  }

  const buttonText = initialSnippet ?
    (isSubmitting || isUpdating ? 'Updating...' : 'Save Changes') :
    (isSubmitting || isInserting ? 'Creating...' : 'Create Snippet');

  const isLoading = isSubmitting || isInserting || isUpdating;
  const currentError = insertError ? insertError : updateError ? updateError : null;


  if (!user?.id) {
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
        className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      {currentError && <p className="text-red-500 text-sm mt-3">Error: {currentError?.message}</p>}
    </form>
  );
};

export default SnippetForm;