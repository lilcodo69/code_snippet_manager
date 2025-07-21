  
import { supabase } from '../supabaseClient'; // Assuming supabase client is exported from './supabase'
import type { CodeSnippet } from '../type/index'; 





  export const getAllSnippets =async(userId?: string):Promise<{data:CodeSnippet[] | null ; error:Error |null}> =>{


    try{

      let query =  supabase
      .from('codesnippet')
      .select('*')

if (userId) {
        query = query.eq('user_id', userId); 
    }

      const  { data, error } = await query.order('created_at', { ascending: false });


      
      if (error) {
        console.error("Supabase fetch error:", error);
        return { data: null, error };
      }
      
      return { data: data as CodeSnippet[], error: null };
    }
    
    catch(err){
      console.log(err);
      return {data:null, error:err as Error}
    }
    
    
  }

  



export const insertSnippet =async (snippet: Omit<CodeSnippet, 'id' | 'created_at'>):Promise<{data:CodeSnippet | null; error:Error |null }>  =>{


  try{
const { data, error } = await supabase
  .from('codesnippet')
  .insert([
   snippet
  ])
  .select().single();


  if(error){
    console.log(error);
    
    return  {data:null,error}
  }
return { data: data as CodeSnippet, error: null };

  }


  catch(err){
       return {data:null, error:err as Error }
  }



}
  





export const updateSnippet  = async(id:string,updates: Partial<CodeSnippet>):Promise<{data: CodeSnippet  |null ; error: Error | null}>=>{

  try{
    const { data, error } = await supabase
  .from('codesnippet')
  .update((updates))
  .eq('id', id)
  .select()
  .single();


  if(error){
    console.log("errror while updating");
    return {data:null,error}
  }
  return {data,error}
  }

  catch (err){

    console.log(err);
    
    return{data:null, error:err as Error }
  }
}
  



export const deleteSnippet =async(id:string):Promise<{error:Error|null}>=>{

  try {
const { error } = await supabase
  .from('codesnippet')
  .delete()
  .eq('id', id)

  if(error){
    return {error}
  }
return {error: null}  

  }

  catch(err){
        console.error("Unexpected error in deleteSnippet:", err);

    return {error:err as Error}
 
  }
}
  

