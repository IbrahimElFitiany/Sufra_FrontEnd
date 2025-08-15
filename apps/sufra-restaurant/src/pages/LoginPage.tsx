import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "@services/authServices";
import { useManagerStore } from "@/stores/authStore";

type UserLogin = {
  email: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const {setManager} = useManagerStore();
  const { register, handleSubmit, setError,formState: { errors, isSubmitting} } = useForm<UserLogin>();

  const handleLogin = async (props: UserLogin) => {
    try {
      const res = await login(props.email, props.password);
      setManager(res);
      navigate("/dashboard");
    } 
    catch (err: any) {
      setError("root", {
        type: "server",
        message: err.response?.data?.message || "Failed to log in. Please try again."
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#061C1A] font-[Inter]">
      <div className="bg-[#0B2A28] border border-[#1A3A37] rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col items-center">
        <img src="/sufraLogo.png" alt="Sufra Logo" className="w-40 mb-4" />
        <p className="text-[#E4C590] font-semibold text-center mb-8">
          Transform your business with Sufra
        </p>

        {errors.root && (
         <div className="bg-red-600 text-white text-sm p-2 w-full rounded-md mb-4">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-y-5 w-full text-white">
          <div>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full bg-transparent border border-[#2C4A47] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4C590] placeholder-gray-400"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full bg-transparent border border-[#2C4A47] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4C590] placeholder-gray-400"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className={`w-full font-semibold py-2 rounded-md transition-colors ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-[#E4C590] text-[#061C1A] hover:bg-[#d8b578]"}`}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;