
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  insertSnippet,
  updateSnippet,
  deleteSnippet,
} from '../services/supabase'; 
import type { CodeSnippet } from '../type';



type deleteSnippetVar  =string;

type insertSnippetVar = Omit<CodeSnippet,'id'|'created_at'>;


type updateSnippetVar = {id:string,updates:Partial<CodeSnippet>};


// TData (what mutationFn returns on success)
 // TError (what mutationFn throws on error)
// TVariables (what you pass to mutate())




export const useInsertSnippet=()=>{

    const queryClient =useQueryClient();

    return useMutation<
     Awaited<ReturnType<typeof insertSnippet>>,
    Error,
    insertSnippetVar
    >({

        mutationFn:async (newSnippet)=>{
            const result = await insertSnippet(newSnippet);
            if (result.error) {
        throw result.error;
      }
      return result;
        },

        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['snippets']});
                  console.log('Snippet inserted successfully! Cache invalidated.');

        },

        onError: (error) => {
      console.error('Error inserting snippet:', error);
    },
    })

}


export const useUpdateSnippet=()=>{
    const queryClient =useQueryClient();

   return useMutation<
 updateSnippetVar,
    Error,
    updateSnippetVar
    >({
        mutationFn: async({id,updates})=>{
            const result= await updateSnippet(id,updates);

            if(result.error){
                throw result.error;
            }
            return result;
        },
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      console.log('Snippet updated successfully! Cache invalidated.');
        },

 onError: (error) => {
      console.error('Error updating snippet:', error.message);
    },


    })



}


export const useDeleteSnippet=()=>{

    const queryClient  = useQueryClient();

    return useMutation<
    deleteSnippetVar,

    Error,
    deleteSnippetVar>({
        mutationFn:async(id)=>{
            const result =await deleteSnippet(id);
               if (result.error) {
        throw result.error;
      }
      return result;
    
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] });
      console.log('Snippet deleted successfully! Cache invalidated.');
    },
    onError: (error) => {
      console.error('Error deleting snippet:', error.message);
    },

    })
}