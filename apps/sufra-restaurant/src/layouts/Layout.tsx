import { Outlet} from "react-router-dom";
import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";

function Layout() {

  return (
    <div className="flex justify-center items-center h-screen w-screen gap-x-2 lg:gap-x-5 p-2 md:p-5 overflow-y-auto bg-bg">
      <Sidebar user={{fname:"Ibrahim",lname:"taha",email:"ibrahimelfitiany@gmail.com"}} />
      <div id="main-section" className="h-full flex-1 flex flex-col">
        <main>
          <Header fname={"test"} activePage={"Static for Testing"}/>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default Layout;