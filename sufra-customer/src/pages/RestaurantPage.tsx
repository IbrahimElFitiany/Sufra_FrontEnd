import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import RestaurantBannerCard from "@components/restaurant/RestaurantBannerCard";
import Menu from "@components/restaurant/Menu";
import NotFoundPage from "@pages/NotFoundPage";
import MainLayout from "@layouts/MainLayout";

import type { RestaurantDetailDTO } from "@type/RestaurantDetailDTO";
import { getRestaurant } from "@services/RestaurantServices";

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
          <div
            id="test"
            className="flex w-full flex-col items-center justify-center"
          >
            <RestaurantBannerCard restaurant={restaurant} />
            <Menu menus={restaurant?.menus || []} />
          </div>
        </MainLayout>
      )}
    </div>
  );
}

export default RestaurantPage;
