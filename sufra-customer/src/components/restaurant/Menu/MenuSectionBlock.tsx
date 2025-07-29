import type { MenuSection } from "@type/MenuSection";
import MenuItemCard from "./MenuItemCard";
import type { MenuItem } from "@type/MenuItem";

type Props = {
  section: MenuSection;
  onAddToCart: (menuItem:MenuItem) => void;
};

const MenuSectionBlock = ({ section, onAddToCart }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 rounded-lg bg-[#1E2928] py-2 px-3 pb-5">
      <h1 className="font-[Rohesta] text-md md:text-3xl p-1 mb-2">{section.menuSectionName}</h1>
      {section.items.length > 0 ? (
        section.items.map((item) => (
          <MenuItemCard
            key={item.menuItemId}
            menuItem={item}
            onAdd={onAddToCart}
          />
        ))
      ) : (
        <p className="text-[#B68D67] italic">No items available.</p>
      )}
    </div>
  );
};

export default MenuSectionBlock;