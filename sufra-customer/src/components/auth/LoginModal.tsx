import { useState } from "react";
import { login } from "@services/AuthServices";
import { useNavigate } from "react-router-dom";
interface LoginModalProps {
  onClose: () => void;
}

function LoginModal({ onClose }: LoginModalProps) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResponse = await login(email, password);
      localStorage.setItem("user", JSON.stringify({
        email: loginResponse.email,
        fname: loginResponse.fname,
        lname: loginResponse.lname,
        role: loginResponse.roleforTesting
      }));
      onClose();
      navigate("/");
    } 
    catch (err: any) {
      console.error("Login failed", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000af] z-50 flex justify-center items-center">
      
      <div id="loginModal"className="flex flex-col items-center bg-[#061C1A] p-6 rounded-md max-w-xs lg:max-w-md w-full border border-[#B68D67]">
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

        <div id="welcome&SignUp" className="w-full text-left my-3 text-sm lg:text-base text-light-grey font-[caughe]">
          <h1 className="text-white text-lg lg:text-xl mb-1">Welcome back</h1>
          <p className="text-[#B68D67] text-xs lg:text-sm">
            New to Sufra?{" "}
            <span className="cursor-pointer underline hover:text-[#e0bfa1]">
              Sign up
            </span>
          </p>
        </div>

        <form id="email&Pass" onSubmit={handleLogin} className="w-full text-[#B68D67] text-sm lg:text-base">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 p-2 my-2 rounded-full border border-[#B68D67] bg-transparent placeholder:text-[#B68D67] focus:outline-none  focus:ring-[#B68D67]"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 p-2 my-2 rounded-full border border-[#B68D67] bg-transparent placeholder:text-[#B68D67]  focus:outline-none  focus:ring-[#B68D67]"
            placeholder="Password"
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

      </div>
    </div>
  );
}

export default LoginModal;
