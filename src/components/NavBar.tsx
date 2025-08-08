import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  if (user) return( <div className="flex justify-end items-center p-4 bg-gray-800 text-white">
    <button onClick={handleLogout} className="">signout</button>
    </div>);

  return "";
};

export default Navbar;
