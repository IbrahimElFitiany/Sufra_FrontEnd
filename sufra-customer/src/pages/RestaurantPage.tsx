import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RestaurantBannerCard from "@components/restaurant/RestaurantBannerCard";
import Menu from "@components/restaurant/Menu/Menu";
import NotFoundPage from "@pages/NotFoundPage";
import MainLayout from "@layouts/MainLayout";

import type { RestaurantDetailDTO } from "@type/RestaurantDetailDTO";
import { getRestaurant } from "@services/RestaurantServices";
import RestaurantOpeningHours from "@components/restaurant/RestaurantOpeningHours";
import Map from "@components/common/Map";

function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantDetailDTO | null>(null);
  const [error, setError] = useState<string |null>(null);

  useEffect(() => {
    try {
      const restaurant = getRestaurant(Number(id));

      restaurant.then((data) => {
        if (data) {
          setRestaurant(data);
        } else {
          setError("Restaurant not found");
        }
      }).catch((err) => {
        setError("Failed to fetch restaurant details");
        console.error("Error fetching restaurant:", err);
      });  
    } 
    catch (error) {
      
    }

  }, [id]);

  return (
    <div>
      {error ? ( <NotFoundPage />) :
      (
        <MainLayout>
          <div className="flex w-full flex-col items-center justify-center">
            <RestaurantBannerCard restaurant={restaurant} />
            <div id="map_And_OpeningHours" className="flex flex-col-reverse md:flex-row justify-between items-center w-full mt-10 lg:rounded-s bg-[#061C1A] p-3 text-[#B68D67]">
              <Map latitude={restaurant?.latitude} longitude={restaurant?.longitude} zoom={13} />
              <RestaurantOpeningHours/>
            </div>
            <Menu menus={restaurant?.menus || []} />
          </div>
        </MainLayout>
      )}
    </div>
  );
}

export default RestaurantPage;