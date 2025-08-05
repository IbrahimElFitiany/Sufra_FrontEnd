function LandingHeader() {
  return (
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
  )
}

export default LandingHeader