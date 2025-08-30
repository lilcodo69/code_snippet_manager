import { useRecentSnippets } from "../hooks/useRecentSnippets";
import RecentSnippets from "../components/snippet/RecentSnippets";
import { SnippetForm } from "../components/snippet/SnippetForm";
import Modal from "../ui/Modal";
import { Button } from "../components/Button";
import { useSearchContext } from "../context/searchBarContext";

const Home = () => {
  const {
    searchQuery,
    searchResults,
    isSearching,
    isSearchError,
    searchError,
    isSearchMode
  } = useSearchContext();
  const {
    data: recentSnippets,
    isLoading: isRecentLoading,
    error: recentError,
  } = useRecentSnippets(7);


  
  const hasRecentSnippets = recentSnippets && recentSnippets.length > 0;
  const hasSearchResults = searchResults && searchResults.length > 0;

  return (
    <div className="relative">
      <div className="fixed  z-40 right-[6.6rem] top-[5.6rem] ">
        <Modal>
       <Modal.Open opens="create-snippet">
            <Button className="rounded-md text-semibold bg-green-500" >+ Create New Snippet</Button>
          </Modal.Open>

          <Modal.Window name="create-snippet">
            <SnippetForm  />
          </Modal.Window>
        </Modal>
      </div>

      <div className="space-y-8">
        {isSearchMode && (
          <div>
            {isSearching && (
              <div className="text-center text-gray-400 py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                Searching...
              </div>
            )}

            {isSearchError && (
              <div className="text-center text-red-500 p-4 bg-red-900 bg-opacity-20 rounded-lg">
                Error: {searchError?.message}
              </div>
            )}

            {searchResults && !isSearching && (
              <div>
                <h3 className="text-2xl font-semibol text-white mb-4">
                   Search Results ({searchResults.length})
                </h3>
                {hasSearchResults ? (
                  <div className="space-y-4"></div>
                ) : (
                  <div className="text-center py-8 bg-gray-800 rounded-lg">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-400 text-lg mb-2">
                      No matching snippets found for "{searchQuery}"
                    </p>
                    <p className="text-gray-500">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!isSearchMode ? (
          <RecentSnippets
            snippets={recentSnippets}
            isLoading={isRecentLoading}
            error={recentError}
          />
        ) : hasRecentSnippets?  (
          <div>
         
            <RecentSnippets
              snippets={searchResults}
              isLoading={isRecentLoading}
              error={recentError}
            />
          </div>
        ) : null}

        {!hasRecentSnippets &&
          !isRecentLoading &&
          !recentError &&
                 (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Code Snippets Yet
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Start building your personal code library! Create your first
                snippet to save and organize your code.
              </p>
               <Modal>
         <Modal.Open opens="create-snippet">
            <Button className="rounded-md text-semibold bg-green-500" >+ Create New Snippet</Button>
          </Modal.Open>

          <Modal.Window name="create-snippet">
            <SnippetForm />
          </Modal.Window>
        </Modal>
            </div>
          )}
      </div>

      {/* {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <SnippetForm onClose={() => setIsCreating(false)} />
        </div>
      )} */}
    </div>
  );
};

export default Home;
