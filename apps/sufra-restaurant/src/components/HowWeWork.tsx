function HowWeWork() {
  const steps = [
    {
      title: "Your Customers Book or Order",
      description:
        "Sufrá brings you new customers ready to reserve a table or place an order through the app.",
    },
    {
      title: "You Stay in Control",
      description:
        "You easily accept, decline, or manage orders and reservations through your dashboard.",
    },
    {
      title: "We Keep Things Running",
      description:
        "From pickup coordination to seamless customer updates — we handle the rest.",
    },
    {
      title: "You Focus on Growth",
      description:
        "Track your performance, manage your floor, and promote your brand — all in one place.",
    },
  ];

  return (
    <div className="px-6 py-20 bg-white text-[#2d2d2d] text-center">
      <h2 className="text-4xl font-[InterMed] text-[#DBB28C] mb-12">
        How We’ll Work Together
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border border-[#DBB28C] bg-[#fffaf5] p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-2xl font-semibold text-[#DBB28C] mb-4">
              {step.title}
            </h3>
            <p className="text-lg leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowWeWork;
