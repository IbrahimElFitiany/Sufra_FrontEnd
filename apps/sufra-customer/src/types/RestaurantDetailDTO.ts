import type { MenuSection } from "@type/MenuSection";

export type RestaurantDetailDTO = {
  imgUrl: string;
  name: string;
  phone: string;
  cuisine: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  district: string;
  rating: number;
  menus: MenuSection[];
};
