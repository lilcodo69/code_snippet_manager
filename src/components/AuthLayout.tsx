import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


const AuthLayout =()=>{

    const [session , setSession] =  useState<any>(null);
    const [loading, setLoading] = useState(true);
     const navigate = useNavigate();


useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (!session) {
        // No session, redirect to login
        navigate('/login');
      }
    };

      checkSession();



      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/login');
      } else {
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      }
    });

     return () => {
      authListener.unsubscribe();
    };



},[navigate])


     if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading user session...</div>;
  }

return <Outlet context={{ session }} />;

}

export default AuthLayout;
