import WhySufra from "@components/WhySufra";
import HowWeWork from "@components/HowWeWork";
import LandingHeader from "@components/LandingHeader";
import LandingHero from "@components/LandingHero";

function LandingPage() {
  return (
    <div id="landing-page" className="w-full h-full">
      <LandingHeader/>
      <LandingHero/>
      <WhySufra/>
      <HowWeWork/>
    </div>
  );
}

export default LandingPage;