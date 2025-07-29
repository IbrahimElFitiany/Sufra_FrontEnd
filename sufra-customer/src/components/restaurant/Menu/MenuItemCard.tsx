import type { MenuItem } from "@type/MenuItem";

type Props = {
  menuItem: MenuItem;
  onAdd: (menuItem:MenuItem) => void;
};

function MenuItemCard({ menuItem, onAdd }: Props) {
  return (
    <div className="flex justify-between border-1 border-[#d5cbec28] rounded-lg">
      <div id="ImageAndDetails" className="flex">
        <div id="Image" className="shrink-0 w-10 h-10 md:w-36 md:h-36 rounded-l-lg  overflow-hidden">
          <img
            src={menuItem.menuItemImg}
            alt={menuItem.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div id="MenuItemDetails" className="flex flex-col px-3 py-1">
          <h3 className="line-clamp-3 text-xs md:text-2xl font-[Rohesta] text-[#B68D67] truncate overflow-hidden whitespace-nowrap">
            {menuItem.name}
          </h3>
          <p className="line-clamp-3 text-xs md:text-lg font-[450] text-[#BCBCBC]">
            {menuItem.description}
          </p>
        </div>
      </div>
      <div id="PriceAndAdd" className="flex flex-col justify-around mx-5 items-end">
        <span className="text-[#B68D67] font-bold text-xl truncate overflow-hidden whitespace-nowrap">
          {menuItem.price} EGP
        </span>
        <button
          onClick={() => onAdd(menuItem)}
          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-[#B68D67] hover:brightness-125 transition duration-200 text-white text-sm "
        >
          <img className="size-5" src="/add.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default MenuItemCard;