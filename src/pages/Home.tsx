// --- Imports ---
import { PageHeader } from '../components/PageHeader';
import { LoadingSpinner } from '../ui/LoadingSpinner';

import Modal from '../ui/Modal';
import { Button } from '../components/Button';
import { useSearchContext } from '../context/searchBarContext';
import { useRecentSnippets } from '../hooks/useRecentSnippets';
import SnippetForm from '../components/snippet/SnippetForm';
import { Empty } from '../components/Empty';
import { ErrorMessage } from './ErrorMessage';
import { NoSearchResults } from './NoSearchResults';
import SnippetsGrid from '../components/snippet/SnippetGrid';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const user = useAuth();
  const { searchQuery, searchResults, isSearching, searchError, isSearchMode } = useSearchContext();
  const { data: recentSnippets, isLoading: isRecentLoading, error: recentError } = useRecentSnippets(7);

  const isLoading = isSearchMode ? isSearching : isRecentLoading;

const hassnippets = recentSnippets && recentSnippets.length > 0;

  const error = isSearchMode ? searchError : recentError;
  const snippetsToDisplay = isSearchMode ? searchResults : recentSnippets;
  const showInitialEmptyState = !isSearchMode && !isLoading && !error && (!snippetsToDisplay || snippetsToDisplay.length === 0);
  const showNoSearchResults = isSearchMode && !isLoading && !error && (!snippetsToDisplay || snippetsToDisplay.length === 0);
  const showGrid = !isLoading && !error && snippetsToDisplay && snippetsToDisplay.length > 0;
  const pageTitle = isSearchMode ? `Search Results (${searchResults?.length || 0})` : 'Recent Snippets';

 if(!user) return ;
  return (
    <Modal>
      {!isSearchMode  && hassnippets?
        <PageHeader title={pageTitle}>
          <Modal.Open opens="create-snippet">
            <Button className="rounded-md font-semibold bg-green-500 hover:bg-green-600">
              + Create New Snippet
            </Button>
          </Modal.Open>
        </PageHeader>
      :""}

      <div className=" flex flex-col flex-1">
        {isLoading && <LoadingSpinner message="Fetching snippets..." />}
        
        {error && <ErrorMessage message={(error as Error)?.message} />}
        
        {showInitialEmptyState && (
       <div className="flex flex-1 h-[70vh] items-center justify-center ">
            <Empty 
              title="No Code Snippets Yet"
              message="Start building your personal code library! Create your first snippet to save and organize your code."
            >
              <Modal.Open opens="create-snippet">
                <Button className="rounded-md font-semibold bg-green-500 hover:bg-green-600">
                  + Create Your First Snippet
                </Button>
              </Modal.Open>
            </Empty>
          </div>
        )}

        {showNoSearchResults &&<div className='flex justify-center items-center h-[70vh]'>
<NoSearchResults searchQuery={searchQuery} />
        </div> }
        
     <div className='mt-20'>
{showGrid && <SnippetsGrid snippets={snippetsToDisplay} />}

      </div>   
      </div>

      <Modal.Window name="create-snippet">
        <SnippetForm />
      </Modal.Window>
    </Modal>
  );
};