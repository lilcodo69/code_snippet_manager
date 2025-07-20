import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";



const Login=()=>{
const navigate = useNavigate();

const [sesssion, setSesssion] = useState<any>(null);


useEffect(()=>{

    supabase.auth.getSession.then(({data:{session}})=>{
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
      authListner.unsubscribe();
    };
},[navigate]);



 const signInWithOAuth = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin, // Redirects back to your app's root URL
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      alert(`Error signing in: ${error.message}`);
    }
  };


    const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert('Logged out successfully!');
      navigate('/login'); 
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      alert(`Error logging out: ${error.message}`);
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