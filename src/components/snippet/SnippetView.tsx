import ReactMarkdown from "react-markdown";

import { SlideOverPanel } from "../../ui/SlideOverPanel";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { CodeSnippet } from "../../type";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "../Button";
import {useReview} from "../../hooks/useReview";
import { useState } from "react";
import SnippetForm from "./SnippetForm";
import Modal from "../../ui/Modal";
import { HiOutlineX } from "react-icons/hi";
import  {reviewSnippet}  from "../../services/supabase";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../ui/LoadingSpinner";

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
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);

  const {
    isPending,
    data: reviewData,
  } = useReview(snippet.code,isReviewPanelOpen);
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);

    toast.success("Code copied to clipboard!");
  };

  const handleAiReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewPanelOpen(true);
    const codeString: string = snippet.code;

    reviewSnippet(codeString);
  };

  return (
    <div className="relative flex flex-col bg-zinc-800 text-white rounded-lg shadow-2xl w-[60rem] max-w-[95vw] h-[85vh] max-h-[900px]">
      <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0 ">
        <h2 className="text-2xl font-bold truncate pr-4" title={snippet.title}>
          {snippet.title}
        </h2>
        <div className="flex items-center gap-2">
          {children}

          <Button
            onClick={handleCopy}
            isIconOnly={true}
            className=" hover:bg-gray-600 "
            aria-label="Copy Code"
            title="Copy Code"
          >
            <img
              src="/img/copy.png"
              alt="Copy Code"
              className="w-6 h-6 object-contain transition-transform group-hover:scale-110" // Icon size, scale on button hover
            />
          </Button>

          <Button
            onClick={handleAiReview}
           
            isIconOnly={true}
            className=" hover:bg-gray-700"
            aria-label="AI Review Code"
            title="AI Review Code"
          >
           
              <img
                src="/img/ai img.png"
                alt="AI Review"
                className="w-6 h-6 object-contain transition-transform group-hover:scale-110"
              />
          
          </Button>

          <Modal>
            <Modal.Open opens="create-snippet">
              <Button
                isIconOnly={true}
                className="bg-transparent hover:bg-gray-700"
                aria-label="Edit Snippet"
                title="Edit Snippet"
              >
                <img
                  src="/img/edit.png"
                  alt="Edit Snippet"
                  className="w-6 h-6 object-contain transition-transform group-hover:scale-110"
                />
              </Button>
            </Modal.Open>

            <Modal.Window name="create-snippet">
              <SnippetForm initialSnippet={snippet} />
            </Modal.Window>
            <Button
              onClick={onCloseModal}
              isIconOnly={true}
              className=" hover:bg-red-900/50 hover:text-red-400"
              aria-label="Close"
              title="Close"
            >
              <HiOutlineX className="w-6 h-6" />
            </Button>
          </Modal>
        </div>
      </div>

      <div className="flex-grow  overflow-y-auto p-4">
        <div className="rounded-md overflow-hidden  h-[70vh]">
          <SyntaxHighlighter
            language={snippet.language?.toLowerCase() || "plaintext"}
            style={tomorrow}
            showLineNumbers
            wrapLines={true}
            customStyle={{
              margin: 0,
              height: "100%",
              whiteSpace: "pre-wrap", 
            }}
            codeTagProps={{
              style: {
                height: "100%",
              },
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
          {isPending && <LoadingSpinner message="Analyzing your code..." />}

          {reviewData && (
            <ReactMarkdown
              children={reviewData.review}
              components={{
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg font-semibold text-blue-400 mt-6 mb-2 border-b border-gray-600 pb-2"
                    {...props}
                  />
                ),

                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-5 space-y-2" {...props} />
                ),

                code({ node: _node, inline, className, children, ...props }) {
                  const { ref: _ref, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");

                  if (inline) {
                    return (
                      <code
                        className={`${className} bg-gray-700 rounded-sm px-1 py-0.5 font-mono text-sm`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  if (match) {
                    const handleBlockCopy = () => {
                      const codeString = String(children).replace(/\n$/, "");
                      navigator.clipboard.writeText(codeString);
                      toast.success("AI suggestion copied!");
                    };

                    return (
                      <div className="relative group my-4">
                        <Button
                          onClick={handleBlockCopy}
                          isIconOnly={true}
                          className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Copy Code"
                          title="Copy Code"
                        >
                          <img
                            src="/img/copy.png"
                            alt="Copy Code"
                            className="w-5 h-5 object-contain"
                          />
                        </Button>

                        <SyntaxHighlighter
                          style={tomorrow as any}
                          language={match[1]}
                          PreTag="div"
                          {...rest}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
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
