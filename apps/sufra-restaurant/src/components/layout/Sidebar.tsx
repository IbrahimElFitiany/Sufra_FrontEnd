import { NavLink, useNavigate } from "react-router-dom";
import { DashboardIcon, OrdersIcon, TablesIcon, OpeningHoursIcon, ReviewsIcon, MenuIcon, ReservationIcon, SettingsIcon, LogoutIcon} from "../../../icons";
import { useManagerStore } from "@/stores/authStore";
import { logout } from "@services/authServices";

type SidebarLinkProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const links: SidebarLinkProps[] = [
  { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon/> },
  { to: "/orders", label: "Orders", icon: <OrdersIcon/> },
  { to: "/reservations", label: "Reservations", icon: <ReservationIcon/> },
  { to: "/tables", label: "Table Management", icon: <TablesIcon/> },
  { to: "/opening-hours", label: "Opening Hours", icon: <OpeningHoursIcon/> },
  { to: "/reviews", label: "Reviews", icon: <ReviewsIcon/> },
  { to: "/menus", label: "Menu Management", icon: <MenuIcon/> },
  { to: "/settings", label: "Settings", icon: <SettingsIcon/> },
];

function SidebarLink({ to, label, icon }: SidebarLinkProps) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center justify-center lg:justify-start gap-2 lg:px-4 py-2 rounded-xl ${isActive ? "bg-[#1B3429] text-[#FFC991]" : "text-[#fff] hover:bg-[#1B3429] duration-300" }`}>
      {icon ? <><span>{icon}</span> <span className="hidden lg:block">{label}</span></> : label}
    </NavLink>
  );
}

function Sidebar() {
  const {manager,clearManager} = useManagerStore.getState()
  const navigate = useNavigate();
  const initials = `${manager!.fname[0]}${manager!.lname[0]}`.toUpperCase();
  const fullName = `${manager!.fname} ${manager!.lname}`;
  
  const handleLogout = async () => {
    await logout();
    clearManager();
    navigate('/');
  };

  return (
    <aside id="Sidebar" className="flex flex-col justify-between items-center mr-3 w-13 lg:w-[15%] h-full p-1 lg:p-4 gap-y-8 rounded-2xl bg-[#061C1A] drop-shadow-md border-1 border-[#ffffff21] font-[Inter] text-[#fff]">
      <div id="sufra-logo" className="hidden lg:flex items-center px-2 my-3 w-full">
        <div className="flex-grow border-t border-accent" style={{ borderTopWidth: "1px" }}></div>
        <img src="/sufraLogo.png" className="h-9" alt="Logo" />
        <div className="flex-grow border-t border-accent" style={{ borderTopWidth: "1px" }}></div>
      </div>

      <nav id="navigations" className="flex grow-1 flex-col w-full gap-4">
        {links.map(({ to, label, icon }) => (
          <SidebarLink key={to} to={to} label={label} icon={icon} />
        ))}
      </nav>

      <div id="profile&logout" className="w-full flex justify-around items-center pb-2 rounded-lg">
        <div className="flex gap-x-2">
          <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-xl font-semibold">
            {initials}
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-white font-semibold text-sm">{fullName}</span>
            <span className="text-gray-400 text-xs">{manager!.email}</span>
          </div>
        </div>

        <button onClick={handleLogout} id="logout" className="cursor-pointer hidden lg:flex ml-6 mt-2 items-center h-full w-[10%] text-[#99A1AF] hover:text-[#ebebeb] duration-300"> 
          <LogoutIcon size={27}/>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;