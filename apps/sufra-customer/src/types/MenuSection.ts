import type { MenuItem } from "@type/MenuItem";

export type MenuSection = {
  restaurantId: number;
  menuSectionId: number;
  menuSectionName: string;
  items: MenuItem[];
};