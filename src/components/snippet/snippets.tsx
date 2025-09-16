import type { CodeSnippet } from "../../type/index";
import getLanguageIcon from "../../getLanguageIcon";
import { HiBookmark } from "react-icons/hi";
import Modal from "../../ui/Modal";
import { SnippetView } from "./SnippetView";
import { useDeleteSnippet } from "../../hooks/useDeleteSnippet";
import { useUpdateSnippet } from "../../hooks/useUpdateSnippet";
import { useState } from "react";

interface SnippetCardProps {
  snippet: CodeSnippet;
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const { mutate: deleteSnippet } = useDeleteSnippet();
  const { mutate: updatePinStatus } = useUpdateSnippet();
  const [isPinned, setIsPinned] = useState(snippet.is_pinned);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure?")) {
      deleteSnippet(snippet.id);
    }
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();

    const newPinStatus = !isPinned;
    setIsPinned(newPinStatus);
    updatePinStatus({ id: snippet.id, updates: { is_pinned: newPinStatus } });
  };

  return (
    <Modal>
      <Modal.Open opens={`view-snippet-${snippet.id}`}>
        <div
          className="group 
                    rounded-lg 
                    overflow-hidden 
                    transform transition-all duration-300 ease-in-out 
                    hover:cursor-pointer hover:shadow-2xl 
                    w-full
                    flex flex-col h-full"
        >
          <div className="h-[9.9rem] w-full relative">
            <div className="flex absolute justify-center items-center top-[-0.6rem] left-[-0.3rem] z-10 gap-3">
              <button
                onClick={handlePin}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <HiBookmark
                  size="60"
                  className={isPinned ? "text-blue-500" : "text-gray-600"}
                />{" "}
              </button>
            </div>

            <img
              src={`${getLanguageIcon(snippet.language)}`}
              className="h-full w-full object-contain bg-white"
            />
          </div>

          <div className="flex flex-col flex-grow justify-between bg-slate-700 pt-2 pl-3 pb-2 pr-3">
            <div>
              <h1
                className="font-mono font-semibold truncate"
                title={snippet.title}
              >
                {snippet.title}
              </h1>
              <div className="overflow-hidden">
                <p className="line-clamp-2" title={snippet.description}>
                  {snippet.description
                    ? snippet.description
                    : "No description added"}
                </p>
              </div>
            </div>

            <div className="flex self-end gap-4 mt-2">
              <Modal.Open opens={`view-snippet-${snippet.id}`}>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="transition-colors duration-350 ease-in-out hover:text-white hover:bg-blue-500 hover:font-semibold bg-white px-[0.8rem] py-[0.3rem] rounded-lg text-blue-500 font-medium"
                >
                  Open
                </button>
              </Modal.Open>

              <button
                onClick={handleDelete}
                className="transition-colors duration-350 ease-in-out bg-red-500 px-2 text-white hover:text-red-500 hover:bg-red-50 rounded-lg font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Modal.Open>

      <Modal.Window name={`view-snippet-${snippet.id}`}>
        <SnippetView snippet={snippet} />
      </Modal.Window>
    </Modal>
  );
};
