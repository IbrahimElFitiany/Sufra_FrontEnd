import { useState, useEffect,useRef} from "react";
import { login } from "@services/AuthServices";
import { useNavigate } from "react-router-dom";
interface LoginModalProps {
  onClose: () => void;
  onSwitch: () => void;
}

function LoginModal({ onClose , onSwitch }: LoginModalProps) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    if(loading) return;
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 3 characters long.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      onClose();
      navigate("/");
    } 
    catch (err: any) {
      console.error("Login failed", err);
      if (err.response?.status === 401) {
        console.log(err.response.data.message)
        setError(err.response?.data?.message || "Something went wrong.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally{
        setLoading(false);
    }
  };
  
  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      //check if modalref is mounted and the event is outside the modal
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown",handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown",handleEscape);
    };
  }, [onClose]);


  return (
    <div className="fixed inset-0 bg-[#000000af] z-50 flex justify-center items-center">
      
      <div 
        id="loginModal"
        className="flex flex-col items-center bg-[#061C1A] p-6 rounded-md max-w-xs lg:max-w-md w-full border border-[#B68D67]"
        ref={modalRef}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl font-bold hover:text-[#e0bfa1] focus:outline-none">
          ×
        </button>
        <img
          id="sufraLogo"
          src="/sufraLogo.png"
          alt="Welcome to Sufra"
          className="w-[70%] mb-12 border-b border-gold-Muted"
        />

        <div id="welcome" className="w-full text-center my-3 text-sm lg:text-base text-light-grey font-[Rohesta]">
          <h1 className="text-white text-lg lg:text-xl mb-1">Welcome back</h1>
        </div>

        <form id="email&Pass" onSubmit={handleLogin} className="w-full text-[#B68D67] text-sm lg:text-base">
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 p-2 my-2 rounded-full border border-[#B68D67] bg-transparent placeholder:text-[#B68D67] focus:outline-none  focus:ring-[#B68D67]"
            placeholder="Email"
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 p-2 my-2 rounded-full border border-[#B68D67] bg-transparent placeholder:text-[#B68D67]  focus:outline-none  focus:ring-[#B68D67]"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-[#B68D67] text-white font-bold p-2 rounded-full hover:bg-[#a77b4f] transition mt-4"
          >
            Login
          </button>

          {error && (
            <div className="mt-5 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
        </form>

        <p className="mt-7 text-[#B68D67] text-xs lg:text-sm">
          New to Sufra?{" "}
          <span 
            onClick={onSwitch}
            className="cursor-pointer underline hover:text-[#e0bfa1]">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginModal;
