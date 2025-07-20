

 export interface CodeSnippet{
id:string,

created_at: string,

title: string,

code: string,

language:string,
user_id: string ,

description? :string,
tags?:string[],

is_pinned :boolean, 

embedding_vectors?: number[]

}

export interface CreateSnippetFormData {
  title: string;
  code: string;
  language: string;
  description?: string;
  tags?: string; 
}

export const getTitle=(snippet:CodeSnippet):string=>{

   const {title}  = snippet;

   return title;
}



export const getIsPinned=(snippet:CodeSnippet):boolean=>{

   const {is_pinned} = snippet;

   return is_pinned;
}