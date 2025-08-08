import type { CodeSnippet } from "../../type/index";
import getLanguageIcon from "../../getLanguageIcon";
import { HiBookmark } from "react-icons/hi";

// Define the props for the card
interface SnippetCardProps {
  snippet: CodeSnippet;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onOpen: (snippet: CodeSnippet) => void;
}

export const SnippetCard = ({
  snippet,
  onDelete,
  onPin,
  onOpen,
}: SnippetCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(snippet.id);
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPin(snippet.id);
  };

  return (
    <div
      className="group 
                rounded-2xl 
                overflow-hidden 
                transform transition-all duration-300 ease-in-out 
                hover:cursor-pointer hover:shadow-2xl hover:-translate-y-1
                w-full"
    >
      <div className="h-[9.9rem] w-full relative">
        <div className="flex absolute justify-center items-center top-[-0.6rem] left-[-0.3rem] z-10 gap-3">
          <button
            onClick={handlePin}
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            <HiBookmark
              size="60"
              className={snippet.is_pinned ? "text-blue-500" : "text-gray-600"}
            />
          </button>
        </div>

        <img
          src={`${getLanguageIcon(snippet.language)}`}
          className="h-full w-full object-fit bg-white hover:opacity-75"
        />
      </div>

      <div className="flex flex-col justify-between bg-slate-400 h-[6.9rem] pt-2 pl-3 pb-2 pr-3 relative">
        <h1 className="font-mono font-semibold">{snippet.title}</h1>

        <div className=" flex-grow overflow-hidden">
          <p
            className=" line-clamp-2"
            title={snippet.description}
          >
            {snippet.description ? snippet.description : "No description added"}
          </p>
        </div>

        <div className="flex self-end gap-4 mt-2">
          <button className="transition-colors duration-350 ease-in-out hover:text-white hover:bg-blue-500 hover:font-semibold bg-slate-100 px-[0.8rem] py-[0.3rem] rounded-lg">
            Open
          </button>

          <button
            onClick={handleDelete}
            className="transition-colors duration-350 ease-in-out bg-red-500 px-2
                       text-white hover:text-red-500 hover:bg-red-50 rounded-lg font-semibold
                       "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
