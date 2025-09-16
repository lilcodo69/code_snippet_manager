import { SearchBar } from "./SearchBar";
import ProfileDropdown from "./ProfileCard";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-lg">
      <div className="mx-auto flex items-center px-[3rem] py-3 justify-between ">
        <div className="text-[1.6rem] font-bold mr-3">
          <span>CodeStashIn</span>
        </div>

        <SearchBar />

        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};