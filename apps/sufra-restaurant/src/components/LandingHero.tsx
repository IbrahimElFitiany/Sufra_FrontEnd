import { motion } from "framer-motion";

function LandingHero() {
  return (
    <div className="relative w-full h-screen">
      <video
        src="/Landingvideo1.mp4"
        className="object-cover w-full h-full"
        autoPlay
        loop
        muted
        playsInline
      />
      <div id="overlay" className="flex items-center justify-center absolute flex-col top-0 left-0 w-full h-full bg-[#000000b9]">
        <div id="logoWithLines" className="flex items-center">
          <motion.div id="left-line"
            className="h-0.5 bg-[#B68D67]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.3,
            }}
            style={{
              width: "500px",
              transformOrigin: "right",
            }}
          />
          <img src="/sufraLogo.png" alt="logo" className="w-full max-w-[350px] mx-4"/>
          <motion.div
            className="h-0.5 bg-[#B68D67]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.3,
            }}
            style={{
              width: "500px",
              transformOrigin: "left",
            }}
          />
        </div>

        <motion.p id="sub-title" initial={{ y: 20 , opacity: 0}}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.3,
            }} className="text-[#B68D67] text-2xl mt-4 font-[caughe] text-center w-[40%]">Join the luxury food network connecting exclusive restaurants with premium customers.
        </motion.p>

        <button className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-[#B68D67] text-white font-[caughe] text-xl  rounded-full shadow-lg hover:brightness-110 hover:scale-102 transition duration-300">
          Join Us
        </button>
      </div>
    </div>
  )
}

export default LandingHero