

import { useSnippets } from '../../context/snippetContext';
import { ErrorMessage } from '../../pages/ErrorMessage';
import { NoSearchResults } from '../../pages/NoSearchResults';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import Modal from '../../ui/Modal'; 
import { SnippetCard } from './snippets';



const SnippetsGrid = () => {
  const { snippetsToDisplay, isLoading, error, isSearchMode, searchQuery } = useSnippets();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center ">
        <LoadingSpinner 
          message={isSearchMode ? 'Searching...' : 'Fetching snippets...'} 
          sizeClass="h-12 w-12"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  if (isSearchMode && snippetsToDisplay.length === 0) {
    return (
       <div className='flex flex-1 items-center justify-center'>
            <NoSearchResults searchQuery={searchQuery} />
        </div>
    );
  }

 
  if (snippetsToDisplay.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 mt-[3rem]">
        {snippetsToDisplay.map((snippet) => (
          <Modal.Open key={snippet.id} opens="view-snippet">
            <SnippetCard 
              snippet={snippet}
            />
          </Modal.Open>
        ))}
      </div>
    );
  }

  return null;
};

export default SnippetsGrid;