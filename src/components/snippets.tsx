import type{ CodeSnippet } from "../type/index";
import useReview from "../hooks/useReview";

interface SnippetCardProps {
  snippet: CodeSnippet;
  onPin: (id: string) => void;     
  onDelete: (id: string) => void; 
  onEdit: (snippet: CodeSnippet) => void;
}

export const SnippetCard = ({ snippet,onDelete,onPin,onEdit  }: SnippetCardProps) => {

const {mutate: getAiReview, isPending:isReviewing, error:reviewError, data:reviewData,reset} = useReview();


   const handleReview = () => {
    if(!snippet.code) return ;
        getAiReview( snippet.code as string);
    };
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
          onClick={() => onEdit(snippet)} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
Edit
        </button>
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
      <button
                    onClick={handleReview}
                    disabled={isReviewing} 
                    className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                 >
                    {isReviewing ? 'Analyzing...' : 'AI Review'}
                 </button>

                 {(reviewData || reviewError) && (
                    <button onClick={() => reset()} className="text-xs text-gray-400 hover:text-white">Clear</button>
                 )}
            </div>

            {isReviewing && <p className="mt-4 text-sm text-gray-400">AI is thinking...</p>}
            
            {reviewError && (
                 <div className="mt-4 p-3 bg-red-900 bg-opacity-30 rounded border border-red-700">
                    <h5 className="font-bold text-red-400 mb-2">Error:</h5>
                    <p className="text-sm text-red-300">{reviewError.message}</p>
                </div>
            )}

            {reviewData && (
                <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
                    <h5 className="font-bold text-white mb-2">AI Review:</h5>
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                        {reviewData.review}
                    </pre>
                </div>
            )}
        </div>
    );
}
