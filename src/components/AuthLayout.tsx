import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type{ Session } from '@supabase/supabase-js'; 

import { supabase } from "../supabaseClient";


const AuthLayout =()=>{

    const [session , setSession] =  useState<Session|null >(null);  //we set default to null and in generic expect it to return either seeions or null
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
authListener.subscription.unsubscribe()  ;  //what is the unsubscribe used for 

};



},[navigate])


     if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading user session...</div>;
  }

return <Outlet context={{ session }} />;  //i do not have to listen for auth in every page , like can just render a conditionlaly that if not logged in this will render a login page and if so then it renders outlet (childrens)

}

export default AuthLayout;
