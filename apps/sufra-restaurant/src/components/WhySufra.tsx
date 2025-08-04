function WhySufra() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 bg-white text-[#2d2d2d] font-[InterMed] text-center">
      {/* Section Title */}
      <h1 className="text-5xl mb-16 text-[#DBB28C]">Why Sufrá</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {/* Card 1 */}
        <div className="border border-[#DBB28C] bg-[#fffaf5] p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-3xl mb-4 text-[#DBB28C]">Reach more customers</h2>
          <p className="text-lg leading-relaxed">
            Thousands of hungry customers are nearby — Sufrá helps them find you and gets their food delivered fast.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-[#DBB28C] bg-[#fffaf5] p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-3xl mb-4 text-[#DBB28C]">Earn more money</h2>
          <p className="text-lg leading-relaxed">
            Serve more guests without adding more tables. We help you increase orders and ensure you're paid promptly.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-[#DBB28C] bg-[#fffaf5] p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-3xl mb-4 text-[#DBB28C]">Grow your business</h2>
          <p className="text-lg leading-relaxed">
            From orders to reservations, Sufrá helps you drive growth, reach new diners, and scale with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhySufra;
