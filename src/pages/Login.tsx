// src/pages/Login.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthActions } from '../hooks/useAuthActions'; 

const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth(); // <-- Get state from context
  const { signInWithOAuth } = useAuthActions(); // <-- Get actions from our hook

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  // Don't render login buttons if we're still checking auth or if user is logged in
  if (isLoading || user) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <button
          onClick={() => signInWithOAuth('google')}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
        >
          {/* SVG for Google would be better for styling */}
          Sign in with Google
        </button>
        <button
          onClick={() => signInWithOAuth('github')}
          className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
           {/* SVG for GitHub would be better */}
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;