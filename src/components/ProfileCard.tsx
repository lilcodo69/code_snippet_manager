import  { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth(); 
  const dropdownRef = useRef<HTMLDivElement>(null);
 const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 
  if (!user) return null; 

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
      >
        <img
          className="w-full h-full object-cover"
          src={avatarUrl || `https://i.pravatar.cc/40?u=${user.id}`} 
          alt="User avatar"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-[20rem] bg-gray-700 rounded-lg shadow-xl z-50"
        >
          <div className="p-4">
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={avatarUrl|| `https://i.pravatar.cc/48?u=${user.id}`}
                alt="User avatar"
              />
              <div>
                <span className="block font-semibold text-white">
                  {user?.user_metadata.name || 'User'}
                </span>
                <span className="block text-sm text-gray-400">
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600"></div>

          <div className="p-2">
            <button
              onClick={signOut}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;



