import { useNavigate } from "react-router-dom";

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";



const Login=()=>{
const navigate = useNavigate();

const [session, setSesssion] = useState<Session |null>(null);


useEffect(()=>{

    supabase.auth.getSession().then(({data:{session}})=>{
        setSesssion(session);

        if(session){
            navigate('/')
        }


    })

    const {data:authListner} = supabase.auth.onAuthStateChange((_event,session)=>{
        setSesssion(session);
        if(session){
             navigate('/');
        }
    })

     return () => {
      authListner.subscription.unsubscribe();
    };
},[navigate]);



 const signInWithOAuth = async (provider: 'google' | 'github') => { //  string can only be either the exact literal string 'google' or the exact literal string 'github'
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin, 
        },
      });
      if (error) throw error;
    } catch (error:unknown ) {

      if(error instanceof Error){
        console.log("Error signing in :", error.message);
            alert(`Error signing in: ${error.message}`);
      }
else{
     console.error('An unexpected error occurred during sign-in:', error);
        alert('An unexpected error occurred during sign-in.');
}
    }
  };


    const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert('Logged out successfully!');
      navigate('/login'); 
    } catch (error: unknown) {
if (error instanceof Error) {
        console.error('Error signing out:', error.message);
        alert(`Error signing in: ${error.message}`);
      } 

else{
 console.error('An unexpected error occurred during logout:', error);
        alert('An unexpected error occurred during logout.');
}
      
    }
  };


  if(session){
    return(
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome, {session.user?.email || session.user?.id}!</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    );
  }
    
  
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <button
          onClick={() => signInWithOAuth('google')}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-4 focus:outline-none focus:shadow-outline"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google logo" className="w-5 h-5 mr-3" />
          Sign in with Google
        </button>
        <button
          onClick={() => signInWithOAuth('github')}
          className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <img src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub logo" className="w-5 h-5 mr-3" />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};



export default Login;