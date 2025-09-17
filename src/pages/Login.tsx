import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthActions } from "../hooks/useAuthActions";

const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { signInWithOAuth } = useAuthActions();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-zinc-300 p-4">
      <div className="flex flex-col gap-[4rem] border-2 border-zinc-700 rounded-md p-7  shadow-lg  w-[30rem] h-[28rem]">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <img src="/img/stack.png" alt="AppImg" className="h-20 w-20 bg-slate-200 rounded-3xl" />
          <h1 className="font-bold text-3xl  text-center">
            Welcome to CodeStash
          </h1>
          <p className="text-center text-[1rem]  text-gray-400">
            SingIn to manage your Code Snippets 
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 mt-8">
          <button
            onClick={() => signInWithOAuth("google")}
            className="w-full flex items-center justify-center gap-4  bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded  focus:outline-none focus:shadow-outline"
          >
            <img
              src="/img/google.png"
              alt="GoogleImg"
              className=" h-7 w-7 rounded-full"
            />
            <p>Sign in with Google</p>
          </button>
          <button
            onClick={() => signInWithOAuth("github")}
            className="w-full flex items-center justify-center gap-4  bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <img
              src="/img/github-sign.png"
              className="bg-white h-7 w-7 rounded-full"
            />
            <p>Sign in with GitHub</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
