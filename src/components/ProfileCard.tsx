import  { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useAuthActions } from '../hooks/useAuthActions';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth(); 
  const dropdownRef = useRef<HTMLDivElement>(null);
    const { signInWithOAuth } = useAuthActions();
 const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;


 const handleSwitch=()=>{
  signInWithOAuth("google");
 }
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
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset- focus:ring-offset-gray-800 transition-all"
      >
        <img
          className="w-full h-full object-cover"
          src={avatarUrl } 
          alt="User avatar"
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-[20rem] bg-zinc-700 rounded-lg shadow-xl z-50"
        >
          <div className="p-4">
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={avatarUrl}
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

          <div className="p-2 flex flex-col justify-center gap-2 items-center  transition-all duration-300 ease-out">
         
            <button onClick={handleSwitch} className='w-full  px-4 py-2  hover:bg-gray-600 rounded-md hover:text-blue-400 transition-all duration-300 ease-out'>
              <img/>
             <p>
              Switch Account
              </p> 
            </button>
<div className='border border-zinc-600 w-full'></div>

             <button
              onClick={signOut}
              className="w-full  px-4 py-2 text-sm text-red-400 hover:bg-gray-600 rounded-md transition-all duration-300 ease-out"
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



