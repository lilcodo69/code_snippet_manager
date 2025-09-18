// src/pages/Home.tsx
import { PageHeader } from "../components/PageHeader";
import Modal from "../ui/Modal";
import { Button } from "../components/Button";
import SnippetForm from "../components/snippet/SnippetForm";
import { Empty } from "../components/Empty";
import { useAuth } from "../context/AuthContext";
import { useSnippets } from "../context/snippetContext";
import SnippetsGrid from "../components/snippet/SnippetGrid";

export const Home = () => {
  const { user } = useAuth();
  const { snippetsToDisplay, isSearchMode, isLoading } = useSnippets();

  const showInitialEmptyState =
    !isSearchMode && !isLoading && snippetsToDisplay.length === 0;
  const showHeader = snippetsToDisplay.length > 0;
  const pageTitle = isSearchMode
    ? `Search Results (${snippetsToDisplay.length})`
    : "Recent Snippets";

  if (!user) return null;

  return (
    <Modal>
      {showHeader && (
        <PageHeader title={pageTitle}>
          <Modal.Open opens="create-snippet">
            <Button className="rounded-md font-semibold bg-green-500 hover:bg-green-600">
              + Create New Snippet
            </Button>
          </Modal.Open>
        </PageHeader>
      )}

      <div className="flex flex-col flex-1">
        {showInitialEmptyState ? (
          <div className="flex flex-1 items-center justify-center">
            <Empty
              title="Your Code Stash is Ready"
              message="It's a little quiet in here. Create your first code snippet to build your personal library and access your best solutions anytime."
            >
              <Modal.Open opens="create-snippet">
                <Button className="rounded-md font-semibold bg-green-500 hover:bg-green-600 px-6 py-2">
                  + Create Your First Snippet
                </Button>
              </Modal.Open>
            </Empty>
          </div>
        ) : (
      
            <SnippetsGrid />
      
        )}
      </div>

      <Modal.Window name="create-snippet">
        <SnippetForm />
      </Modal.Window>
    </Modal>
  );
};
