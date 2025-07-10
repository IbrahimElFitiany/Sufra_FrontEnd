import { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import CuisineSlider from "@components/CuisineSlider";
import SufraPicks from "@components/SufraPicks";
import { getSufraPicks } from "@services/RestaurantServices";
import type { RestaurantListDTO } from "@type/RestaurantListDTO";


function HomePage() {
  const [sufraPicks, setSufraPicks] = useState<RestaurantListDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const data = await getSufraPicks();
        setSufraPicks(data);
      } catch (err) {
        setError("Failed to fetch Sufra Picks");
        console.error("Failed to fetch Sufra Picks:", err);
      }
        finally {
        setLoading(false);
      }
    };

    fetchPicks();
  }, []);

  return (
    <MainLayout>
      <div id="landing-page-banner" className="mt-5 mb-9 w-[95%] lg:mt-15 lg:w-full">
        <img src="/banner.png" alt="Sufra promotional banner" />
      </div>
      <SufraPicks loading={loading} error={error} sufraPicks={sufraPicks}/>
      <CuisineSlider/>
    </MainLayout>
  );
}

export default HomePage;