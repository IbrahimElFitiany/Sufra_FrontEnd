import { easeIn, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cards = [
  {
    title: "Reach More Customers",
    text: "Thousands of hungry customers are nearby — Sufrá helps them find you and gets their food delivered fast.",
  },
  {
    title: "Earn More Money",
    text: "Serve more guests without adding more tables. We help you increase orders and ensure you're paid promptly.",
  },
  {
    title: "Grow Your Business",
    text: "From orders to reservations, Sufrá helps you drive growth, reach new diners, and scale with confidence.",
  },
];

function WhySufra() {
  const [ref, inView] = useInView();

  return (
    <section
      id="whyPartnerWithUs"
      ref={ref}
      className=" py-20 px-8 flex flex-col items-center"
    >
      
      <h1 className="flex items-center justify-center gap-4 text-4xl font-[caughe] text-[#2D2D2D] tracking-wide mb-16">
        Why Partner with
        <img
          src="/sufraLogo.png"
          alt="Sufra Logo"
          className="h-10 object-contain"
        />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-[#061C1A] shadow-lg rounded-xl p-8 flex flex-col justify-between items-start text-[#C89F64] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.3,
              ease: [0.33, 1, 0.68, 1]
            }} 
            >
            <h2 className=" text-white text-2xl font-[caughe] mb-4">{card.title}</h2>
            <p className="text-base font-[Inter] leading-relaxed">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhySufra;
