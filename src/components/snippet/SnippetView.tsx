import ReactMarkdown from "react-markdown";

import { SlideOverPanel } from "../../ui/SlideOverPanel";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { CodeSnippet } from "../../type";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "../Button";
import useReview from "../../hooks/useReview";
import { useState } from "react";
import SnippetForm from "./SnippetForm";
import Modal from "../../ui/Modal";
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import {  CodeProps } from 'react-markdown/lib/ast-to-react';

interface SnippetViewProps {
  snippet: CodeSnippet;
  onCloseModal?: () => void;
  children?: React.ReactNode;
}

export const SnippetView = ({
  snippet,
  onCloseModal,
  children,
}: SnippetViewProps) => {
  const {
    mutate: performReview,
    isPending,
    data: reviewData,
    error: reviewError,
  } = useReview();
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
const [isEditing, setIsEditing] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);

    alert("Code copied to clipboard!");
  };

  const handleAiReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewPanelOpen(true);
    console.log(snippet.code);
    const codeString: string = snippet.code;
    console.log("typeof snippet.code:", typeof snippet.code);

    performReview(codeString);
  };

  return (
    // THE REFACTORED JSX:
    // 1. The main container is now the relative anchor
    <div className="relative flex flex-col bg-zinc-800 text-white rounded-lg shadow-2xl w-[60rem] max-w-[95vw] h-[85vh] max-h-[900px]">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0 ">
        <h2 className="text-2xl font-bold truncate pr-4" title={snippet.title}>
          {snippet.title}
        </h2>
        <div className="flex items-center gap-3">
          {children}
          <Button onClick={handleCopy}>Copy Code</Button>
          <Button onClick={handleAiReview} disabled={isPending}>
            {isPending ? "Reviewing..." : "AI Review"}
          </Button>
          <Button onClick={onCloseModal} className="bg-gray-700 hover:bg-gray-600">
            Close
          </Button>
         <Modal>
                     <Modal.Open opens="create-snippet">
                       <Button className='rounded-md text-semibold bg-gray-500'>✏️ Edit</Button>
                     </Modal.Open>
         
                     <Modal.Window name="create-snippet">
                       <SnippetForm initialSnippet={snippet}/>
                     </Modal.Window>
                   </Modal>
        </div>
      </div>

      {/* --- BODY --- */}
      <div className="flex-grow  overflow-y-auto p-4">
        <div className="rounded-md overflow-hidden  h-[70vh]">
          <SyntaxHighlighter
            language={snippet.language?.toLowerCase() || 'plaintext'}
            style={tomorrow}
            showLineNumbers
            wrapLines={true}
            customStyle={{ margin: 0,height: '100%' }}
            codeTagProps={{
        style: {
          height: '100%',
          
        }
        
      }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
<SlideOverPanel
          isOpen={isReviewPanelOpen}
          onClose={() => setIsReviewPanelOpen(false)}
          title="AI Code Review"
        >
          {isPending && (
            <p className="text-blue-400">Analyzing your code...</p>
          )}
          {reviewError && (
            <p className="text-red-400">Error: {reviewError.message}</p>
          )}

          {/* This is the part that does all the work */}
          {reviewData && (
            <ReactMarkdown
              children={reviewData.review} // 1. Pass the markdown text here
              components={{
                // 2. This part tells the component how to handle code blocks
                code({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: CodeProps) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          )}
        </SlideOverPanel>   
           </div>

      
    
    </div>
  );
};
