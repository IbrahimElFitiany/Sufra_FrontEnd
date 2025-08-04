import { motion } from "framer-motion";
import WhySufra from "@components/WhySufra";
import HowWeWork from "@components/Howwework";

function LandingPage() {
  return (
    <div id="landing-page" className="w-full h-full">
      <header className="font-[caughe] absolute top-0 left-0 w-full z-50 flex items-center justify-between px-20 py-6 text-white">
        <img src="/sufraLogo.png" alt="Sufra Logo" className="h-10" />

        <nav className="flex items-center gap-6">
          <a href="#why-sufra" className="hover:text-[#B68D67] transition">Why Sufra</a>
          <a href="#how-it-works" className="hover:text-[#B68D67] transition">How It Works</a>
          <a href="#contact" className="hover:text-[#B68D67] transition">Contact</a>
          <button className="bg-[#B68D67] text-white px-4 py-2 rounded-full border border-transparent hover:border-[#B68D67] hover:bg-transparent hover:text-[#B68D67] transition duration-300">
            Login
          </button>
        </nav>
      </header>
      <div className="relative w-full h-[750px]">
        <img src="/landing.jpg" alt="Landing" className="object-cover w-full h-full"/>

        <div className="absolute top-0 left-0 w-full h-full bg-[#000000b9] flex items-center justify-center">
          <div className="flex items-center">
            <motion.div
              className="h-0.5 bg-[#B68D67] origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ width: "500px" }}
            />
            <img src="/sufraLogo.png" alt="logo" className="w-full max-w-[250px] mx-4"/>
            <motion.div
              className="h-0.5 bg-[#B68D67] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ width: "500px" }}
            />
          </div>
        </div>
      </div>
      <WhySufra/>
      <HowWeWork/>
    </div>
  );
}

export default LandingPage;