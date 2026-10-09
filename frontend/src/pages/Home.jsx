import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import ArtifactPanel from "../components/ArtifactPanel";
import ChatArea from "../components/ChatArea";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/LandingPage";
import api from "../utils/axios";
import { setUserData } from "../redux/user.slice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useDispatch();

  const login = async (token) => {
    try {
      const { data } = await api.post(`/api/auth/login`, { token });
      dispatch(setUserData(data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
      setShowLoginModal(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await login(token);
    } catch (error) {
      console.log(error);
      setIsLoggingIn(false);
    }
  };

  // If user is not logged in, render the modern landing page
  if (!userData) {
    return (
      <>
        <LandingPage
          onLogin={handleGoogleLogin}
          onOpenLoginModal={() => setShowLoginModal(true)}
          isLoggingIn={isLoggingIn}
        />

        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-[360px] max-w-full bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5 shadow-2xl relative">
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer text-sm"
              >
                ✕
              </button>
              <div className="flex flex-col gap-1">
                <h2 className="text-[18px] font-semibold text-slate-100 tracking-tight">Welcome to Grid</h2>
                <p className="text-[13px] text-slate-500">Sign in to access your multi-agent AI workspace.</p>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-800 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                <FaGoogle size={15} className="text-white" />
                {isLoggingIn ? "Signing in..." : "Continue with Google"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Once authenticated, display the main application workspace
  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
      <Sidebar />
      <ChatArea />
      <ArtifactPanel />
    </div>
  );
}

export default Home;