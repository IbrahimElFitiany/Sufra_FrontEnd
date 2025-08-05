import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const [ref, inView] = useInView();

  return (
    <div id="whyPartnerWithUs" className="flex flex-col m-10 justify-center items-center text-5xl font-[Inter]">
      <h1>How We <span className="text-gold-Muted">Work Together</span></h1>
      <div id="WhyWorkWithUsCardContainer" className="grid md:grid-cols-4">
        {steps.map((card,index)=>{
          return (
            <motion.div  className="bg-amber-400 m-10 md:mx-5 lg:m-10 p-4 flex flex-col justify-center items-center gap-y-2" key={index}>
              <h1 className="text-3xl">{card.title}</h1>
              <p className="text-xl">{}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HowWeWork;
