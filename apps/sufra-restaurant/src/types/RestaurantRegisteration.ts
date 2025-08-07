import type { RestaurantManager } from "@/types/RestaurantManager";
import type { Restaurant } from "@/types/Restaurant";

export type RestaurantRegistration = {
  restaurantManager: RestaurantManager;
  restaurant: Restaurant;
};