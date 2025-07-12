import {useState, useEffect, useRef} from "react";
import {register } from "@services/AuthServices";
import { useNavigate } from "react-router-dom";

interface RegisterModalProps {
  onClose: () => void;
  onSwitch: ()=> void;
}

function RegisterModal({ onClose,onSwitch }: RegisterModalProps) {
  
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [error,setError] = useState<string>("")
  const [fname,setFname] = useState<string>("");
  const [lname,setLname] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [phone,setPhone] = useState<string>("");

  const [loading,setLoading] = useState<boolean>(false)

  const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
    if(loading) return;

    e.preventDefault();
    
    if (!fname || !lname || !email || !password || !phone) {
      setError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      await register({fname,lname,email,password,phone})
      onClose();
      navigate("/");
    } 
    catch (error: any) {
      if (error.response?.data?.message === `Email: ${email} is already in use.`) {
        setError("Email already exists. Please use another one.");
      } 
      else if (error.response?.data?.message === `Number: ${phone} is already in use.`) {
        setError("Number is already in use.");
      } 
      else {
        setError("Registration failed. Please try again.");
      }
    }
    finally{
      setLoading(false);
    }
  }

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
        id="registerModal"
        ref={modalRef}
        className="flex flex-col items-center bg-[#061C1A] p-6 rounded-md max-w-xs lg:max-w-md w-full border border-[#B68D67]"
      >
        <button id="close_button" onClick={onClose} className="absolute top-4 right-4 text-white text-xl font-bold hover:text-[#e0bfa1] focus:outline-none"> × </button>
        <img
          id="sufraLogo"
          src="/sufraLogo.png"
          alt="Welcome to Sufra"
          className="w-[70%] mb-12 border-b border-gold-Muted"
        />

        <form id="Form" onSubmit={handleRegister} className="w-full text-[#B68D67] text-sm lg:text-base">
          {/* First Name */}
          <input
            autoFocus
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className={`w-full px-3 p-2 my-2 rounded-full border ${
              !fname && error ? 'border-red-500' : 'border-[#B68D67]'
            } bg-transparent placeholder:text-[#B68D67] focus:outline-none focus:ring-[#B68D67]`}
            placeholder="First Name"
          />
          {!fname && error && <p className="text-red-500 text-xs pl-2">First name is required</p>}

          {/* Last Name */}
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className={`w-full px-3 p-2 my-2 rounded-full border ${
              !lname && error ? 'border-red-500' : 'border-[#B68D67]'
            } bg-transparent placeholder:text-[#B68D67] focus:outline-none focus:ring-[#B68D67]`}
            placeholder="Last Name"
          />
          {!lname && error && <p className="text-red-500 text-xs pl-2">Last name is required</p>}

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 p-2 my-2 rounded-full border ${
              !email && error ? 'border-red-500' : 'border-[#B68D67]'
            } bg-transparent placeholder:text-[#B68D67] focus:outline-none focus:ring-[#B68D67]`}
            placeholder="Email"
          />
          {!email && error && <p className="text-red-500 text-xs pl-2">Email is required</p>}

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 p-2 my-2 rounded-full border ${
              !password && error ? 'border-red-500' : 'border-[#B68D67]'
            } bg-transparent placeholder:text-[#B68D67] focus:outline-none focus:ring-[#B68D67]`}
            placeholder="Password"
          />
          {!password && error && <p className="text-red-500 text-xs pl-2">Password is required</p>}

          {/* Phone */}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-3 p-2 my-2 rounded-full border ${
              !phone && error ? 'border-red-500' : 'border-[#B68D67]'
            } bg-transparent placeholder:text-[#B68D67] focus:outline-none focus:ring-[#B68D67]`}
            placeholder="Phone"
          />
          {!phone && error && <p className="text-red-500 text-xs pl-2">Phone number is required</p>}

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-xs mt-2 pl-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#B68D67] text-white font-bold p-2 rounded-full hover:bg-[#a77b4f] transition mt-4"
          >
            Register
          </button>
        </form>


        <div className=" w-full text-center  my-3 text-sm lg:text-base text-gray-300 font-sans">
          <p className="text-[#B68D67] text-xs lg:text-sm">
            Already have an account?{" "}
            <span
              className="cursor-pointer underline hover:text-[#e0bfa1]"
              onClick={onSwitch}
            >
              Log in
            </span>
          </p>
        </div>


      </div>
    </div>
  );
}

export default RegisterModal;