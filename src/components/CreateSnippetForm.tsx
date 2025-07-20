import { Form, Navigate, useNavigate } from "react-router-dom"
import  type {  CodeSnippet, CreateSnippetFormData } from "../type"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useInsertSnippet } from "../hooks/useSnippet";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

export const CreateSnippetForm=()=>{

 const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm<CreateSnippetFormData>();
type insertSnippetVar = Omit<CodeSnippet, 'id' | 'created_at' | 'embedding_vectors'>;

const {mutate:insertSnippetMutation} = useInsertSnippet();
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
 const [userId, setUserId] = useState<string | undefined>();


  useEffect(() => {
    const getUserId = async () => {
      setAuthLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);  //id is set here 
      } else {
        console.warn("No active Supabase user session found during initial fetch.");
        setUserId(undefined); 
      }
      setAuthLoading(false);
    };

    getUserId();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {  //is it a convention to use underscore as  prefix while naming event 
      setUserId(session?.user?.id || undefined);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);


const onSubmit: SubmitHandler<CreateSnippetFormData>= (data)=>{
  if (userId === undefined) {
      alert("Please log in to create a snippet.");
      navigate('/login');
      return; 
    }

    const snippetToInsert:insertSnippetVar  = {
      title: data.title,
      code: data.code,
      language: data.language,
      description: data.description === '' ? undefined : data.description,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [], 
      user_id: userId ,
      is_pinned: false, 
      
    };

    console.log("sniipet:" ,snippetToInsert);
    
    insertSnippetMutation(snippetToInsert, {
      onSuccess: () => {
        alert('Snippet created successfully!');
        reset();
      },
      onError: (err) => {
        console.error('Failed to create snippet:', err);
        alert(`Error creating snippet: ${err.message}`);
      }
    });
  }; 

  return(
    <form onSubmit = {handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
         <h2 className="text-2xl font-bold text-white mb-6">Create New Snippet</h2>

         <div>
            <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Title</label>

            <input id= 'title' type = 'text'  {...register("title", { required: "Title is required" })}
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600"
          placeholder="React Hooks Best Practices" disabled={isSubmitting}
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
        />
      </div>


       <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting  ? 'Creating...' : 'Create Snippet'}
      </button>
    </form>
  )


}
