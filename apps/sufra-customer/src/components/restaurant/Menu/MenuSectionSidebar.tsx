import type { MenuSection } from "@type/MenuSection";

type Props = {
  sections: MenuSection[];
  onSectionClick: (id: number) => void;
};

const MenuSectionSidebar = ({ sections, onSectionClick }: Props) => {
  return (
    <div className="hidden min-w-[20%] md:flex flex-col gap-y-2.5">
      {sections.map((section) => (
        <button
          key={section.menuSectionId}
          onClick={() => onSectionClick(section.menuSectionId)}
          className="cursor-pointer flex justify-center w-full p-2 rounded-md bg-[#1E2928] font-[Rohesta] text-md md:text-2xl hover:bg-[#273734] transition"
        >
          {section.menuSectionName}
        </button>
      ))}
    </div>
  );
};

export default MenuSectionSidebar;
