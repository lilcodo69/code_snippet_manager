import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthLayout = () => {
  const { session, isLoading: isLoadingSession } = useAuth();

  const navigate = useNavigate();

  if (!session) {
    navigate("/login");
  } else {
    if (window.location.pathname === "/login") {
      navigate("/");
    }
  }

  if (isLoadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading user session...
      </div>
    );
  }

  return <Outlet context={{ session }} />;
};

export default AuthLayout;
