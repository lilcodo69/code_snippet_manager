import { useAuth } from "../../context/AuthContext";
import type { CodeSnippet, SnippetSearchResult } from "../../type";
import { SnippetCard } from "./snippets";

import Modal from "../../ui/Modal";
import { Button } from "../Button";
import { SnippetForm } from "./SnippetForm";
import { useSearchContext } from "../../context/searchBarContext";

type SnippetOrSearchResult = CodeSnippet | SnippetSearchResult;

interface RecentSnippetsProps {
  snippets?: SnippetOrSearchResult[];
  isLoading?: boolean;
  error?: Error | null;
}

const RecentSnippets = ({
  snippets,
  isLoading,
  error,
}: RecentSnippetsProps) => {
  const { user } = useAuth();
  const { isSearchMode } = useSearchContext();

  if (!user) {
    return (
      <div className="bg-blue-800 p-4 rounded-lg text-white text-center">
        Please log in to see your snippets.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-white">Loading recent snippets...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading snippets: {error.message}
      </div>
    );
  }

  return (
    <div className="">
      {(snippets && snippets.length > 0) || isSearchMode ? (
        <div
          className="w-full  
                      grid 
                      grid-cols-[repeat(1,_27rem)]
                      lg:grid-cols-[repeat(3,_27rem)]
                      gap-x-[1.3rem]
                      gap-y-[1.4rem]
                      sm:grid-cols-[repeat(2,_27rem)]
                      justify-center 
                      px-4"
        >
          {snippets?.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-lg mb-4">
            You haven't created any snippets yet.
          </p>
          <p className="text-gray-500 mb-6">
            Click the button below to create your first one!
          </p>

          <Modal>
            <Modal.Open opens="create-snippet">
              <Button className="rounded-md text-semibold bg-green-500">
                + Create New Snippet
              </Button>
            </Modal.Open>

            <Modal.Window name="create-snippet">
              <SnippetForm />
            </Modal.Window>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default RecentSnippets;
