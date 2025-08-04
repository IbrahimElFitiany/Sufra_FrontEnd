import { useRef } from "react";
import type { MenuItem } from "@type/MenuItem";
import type { MenuSection } from "@type/MenuSection";
import { addToCart} from "@services/CartServices";
import MenuSectionSidebar from "@components/restaurant/Menu/MenuSectionSidebar";
import MenuSectionBlock from "@components/restaurant/Menu/MenuSectionBlock";
import SearchBar from "@components/common/SearchBar";

type Props = {
  menus: MenuSection[];
};

function Menu({ menus }: Props) {
  const sectionRefs = useRef<{[key: number]: HTMLDivElement | null }>({});

  const handleScrollToSection = (id: number) => {
    const section = sectionRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const onAddToCart = async (item: MenuItem) => {
    try {
      await addToCart(item.menuItemId, 1);
    } 
    catch (error: any) {
    }
  };
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    for (const section of menus) {
      const match = section.items.find(item =>
        item.name.toLowerCase().includes(lowerQuery)
      );
      if (match) {
        handleScrollToSection(section.menuSectionId);
        return;
      }
    }
  };
  return (
    <div className="flex flex-col mt-10 mb-7 w-full justify-center items-center rounded-s bg-[#061C1A] p-3 text-[#B68D67]">

      <div id="TitleWithItsLines" className="flex my-5 items-center justify-center space-x-4 w-full">
        <div className="flex-1 border-t border-[#B68D67]"></div>
        <h1 className="text-5xl font-[Rohesta] whitespace-nowrap px-4">MENU</h1>
        <div className="flex-1 border-t border-[#B68D67]"></div>
      </div>

      <SearchBar   onSearch={handleSearch} 
        placeholder='Search menu for a particular dish...'
        classname='flex gap-x-1 md:gap-x-0 font-semibold items-center justify-center w-[70%] mx-6 border border-[#B68D67] rounded-lg'
      />

      <div id="SectionTransitionAndFullMenu" className="flex justify-center w-full md:w-[90%] my-6 gap-x-2 md:gap-x-4">
        <MenuSectionSidebar sections={menus} onSectionClick={handleScrollToSection} />
        <div id="Menu-FullView" className="flex flex-col w-full gap-y-3">
          {menus.map((section) => (
            <div key={section.menuSectionId} ref={(el) => { if (el) sectionRefs.current[section.menuSectionId] = el;}}>
              <MenuSectionBlock
                section={section}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;