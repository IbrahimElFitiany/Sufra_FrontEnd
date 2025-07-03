import { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import RestaurantCard from "@components/RestaurantCard";
import CuisineSlider from "@components/CuisineSlider";
import RestaurantCardSkeleton from "@components/RestaurantCardSkeleton";
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
        console.error("Failed to fetch Sufra Picks:", error);
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
        <img src="/banner.png" alt="" />
      </div>

      <div id="sufraPicksContainer" className="bg-medium-Green flex w-[95%] flex-col rounded-xs lg:w-full lg:rounded-md pb-4 lg:pb-8">

        <h1 id="SufraPicksText" className="m-5 xl:ml-9 font-[Greethen] text-2xl text-[#B68D67] lg:text-6xl">
          Sufra Picks
        </h1>

        <div id="SufraPicksCardsWrapper" className="mx-auto grid w-[95%] grid-cols-4 gap-x-1.5 md:gap-x-3  lg:gap-x-4 gap-y-2 md:grid-cols-4 lg:grid-cols-4">
          {(loading || error)
            ? Array.from({ length: 4 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
            : sufraPicks.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  cuisine={restaurant.cuisineName}
                  district={restaurant.district}
                  gov={restaurant.gov}
                  rating={restaurant.rating}
                  image={restaurant.img}
                />
              ))}
        </div>
        
      </div>

      <CuisineSlider/>
    </MainLayout>
  );
}

export default HomePage;
