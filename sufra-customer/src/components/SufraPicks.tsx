import RestaurantCard from "@components/restaurant/RestaurantCard";
import RestaurantCardSkeleton from "@components/restaurant/RestaurantCardSkeleton";
import type { RestaurantListDTO } from "@type/RestaurantListDTO";

interface SufraPicksProps{
    loading:boolean,
    error:string|null,
    sufraPicks:RestaurantListDTO[]
}

function SufraPicks({loading,error,sufraPicks}:SufraPicksProps) {
  return (
      <div id="sufraPicksContainer" className="bg-medium-Green flex w-[95%] flex-col rounded-xs lg:w-full lg:rounded-md pb-4 lg:pb-8">

        <h1 id="SufraPicksText" className="m-5 xl:ml-9 font-[Greethen] text-2xl text-[#B68D67] lg:text-6xl">
          Sufra Picks
        </h1>

        <div id="SufraPicksCardsWrapper" className="mx-auto grid w-[95%] grid-cols-4 gap-x-1.5 md:gap-x-3  lg:gap-x-4 gap-y-2 md:grid-cols-4 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-4 text-center bg-[#ffffff18] text-[#B68D67] p-6 rounded-md shadow-md">
              <p className="text-xl font-semibold">Oops! Something went wrong.</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          ) : sufraPicks.length === 0 ? (
            <p className="col-span-4 text-white text-center">No restaurants found.</p>
          ) : (
            sufraPicks.map((restaurant) => (
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
            ))
          )}
        </div>
        
      </div>

  )
}

export default SufraPicks