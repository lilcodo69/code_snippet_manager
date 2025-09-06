// src/components/AuthLayout.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const AuthLayout = () => {
  const { session, isLoading: isLoadingSession } = useAuth();


  if (isLoadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }


  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ session }} />;
};

export default AuthLayout;