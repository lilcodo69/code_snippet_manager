import { CodeSnippet } from "../type/index";

interface SnippetCardProps {
  snippet: CodeSnippet;
  onPin: (id: string) => void;     
  onDelete: (id: string) => void; 
}

export const SnippetCard = ({ snippet,onDelete,onPin }: SnippetCardProps) => {


  
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">
        {snippet.is_pinned ? `${snippet.title} 📌` : `${snippet.title}`}
      </h3>

      <p className="text-sm text-gray-600">Language: {snippet.language}</p>
      <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
        {snippet.code}
      </pre>

        <p>
            {snippet.description ? snippet.description : ''}

        </p>

<div className="flex gap-2 mt-2">
  <button 
    onClick={() => onPin(snippet.id)}
    className="px-3 py-1 bg-blue-500 text-white rounded"
  >
    {snippet.is_pinned? 'unpin' :"pin"}
  </button>
  
  <button 
    onClick={() => onDelete(snippet.id)}
    className="px-3 py-1 bg-red-500 text-white rounded"
  >
    Delete
  </button>
</div>

    </div>
  );
};
