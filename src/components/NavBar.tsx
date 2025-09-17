import { useRecentSnippets } from "../hooks/useRecentSnippets";
import ProfileDropdown from "./ProfileCard";
import { SearchBar } from "./SearchBar"; 

export const Navbar = () => {
  const { data: recentSnippets } = useRecentSnippets();
  const hasSnippets = recentSnippets && recentSnippets.length > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b-2 border-zinc-700 text-white shadow-lg">
      <div className="mx-auto flex items-center px-[3rem] py-3">
        {hasSnippets ? (
          <div className="flex w-full items-center justify-between">
            <div className="text-[1.6rem] font-bold mr-4">
              <span className="text-zinc-200">CodeStash</span>
            </div>

            <SearchBar />

            <div className="flex items-center gap-4">
              <ProfileDropdown />
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center">
            <div className="flex-1"></div>

            <div className="text-[1.6rem] font-bold">
              <span>CodeStashIn</span>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
              <ProfileDropdown />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};