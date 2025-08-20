import { Outlet , useLocation } from "react-router-dom";
import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";

function Layout() {
  const {pathname:activePage} = useLocation() 

  return (
    <div className="flex justify-center items-center h-screen w-screen gap-x-2 lg:gap-x-5 p-2 md:p-5 overflow-y-auto bg-bg">
      <Sidebar/>
      <div id="main-section" className="h-full flex-1 flex flex-col">
        <main>
          <Header activePage={activePage}/>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default Layout;