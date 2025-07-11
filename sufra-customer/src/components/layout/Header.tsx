import { lazy ,Suspense , useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { HashLoader } from 'react-spinners';

import SearchBar from '@components/common/SearchBar';
const LoginModal = lazy(() => import("@components/auth/LoginModal"));
const RegisterModal = lazy(()=> import("@components/auth/RegisterModal"))
import { logout } from '@services/AuthServices';


function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const isLoggedIn = token? true : false;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "login" | "register">(null);

  const user = localStorage.getItem("user");
  const { fname, lname } = user ? JSON.parse(user) : { fname: "", lname: "" };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const SearchRestaurants = (query:string, page:number) => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (page) params.append("page", String(1));
    navigate(`/search?${params.toString()}`);
  };



  return (
    <header className="relative w-full border-b-1 border-[#B68D67] px-6 py-4 text-white flex items-center justify-between">

      {/* Logo */}
      <Link to = '/' className="flex justify-center items-center w-22 lg:w-35 pl-2">
        <img src="/Sufrá.png" alt="Sufrá logo" />
      </Link>

      {/* Desktop Search Bar */}
      <div className="hidden lg:block w-full">
        <SearchBar onSearch={SearchRestaurants} />
      </div>

      {/* Desktop Auth Buttons */}
      {isLoggedIn ?

       <div id='logged_in' className='hidden lg:flex justify-center items-center space-x-6 font-[Inter] font-medium text-[#B68D67] text-xs lg:text-lg'>
          <button 
            id='notification'
            className='size-[30px] transform duration-200 hover:scale-110 hover:brightness-130'
            >
            <img src="/notification-bell.png" alt="" />
          </button>

          <Link 
            to={"/cart"}
            className='size-7  transform duration-200 hover:scale-110 hover:brightness-130'
          >
            <img src="/shopping-bag (1).png" alt="" />
          </Link>

          <button 
            id='ProfilePage'
            onClick={handleLogout}
            className="hover:ring-3 hover:ring-[#213a39] size-8 bg-amber-50 rounded-full overflow-hidden transform transition-transform duration-200 hover:scale-110"
          >
            {fname && lname ? `${fname[0]}${lname[0]}`.toUpperCase() : "?"}
          </button>    
        </div>
       :
        <div id='guest' className="hidden lg:flex space-x-4 font-[caughe] text-xs lg:text-lg">
          <button onClick={() => setActiveModal("login")} className="rounded-4xl bg-transparent border text-[#A07E5D] border-[#B68D67] px-4 py-2 hover:bg-[#B68D67] hover:text-white transition">
            Login
          </button>
          <button onClick={() => setActiveModal("register")} className="rounded-4xl bg-[#B68D67] border border-[#B68D67] px-4 py-2 hover:bg-transparent transition">
            Register
          </button>
        </div>
      } 


      {/* Mobile Icons */}
      <div className="lg:hidden flex gap-3 items-center text-[#B68D67] ">
        <Search className="size-6 cursor-pointer" onClick={() => setShowSearch(!showSearch)} />
        <Menu className="size-6 cursor-pointer" onClick={() => setShowMobileMenu(!showMobileMenu)} />
      </div>

      {/* Mobile Dropdown Search */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-[white] px-4 py-3 border-t border-[#B68D67]">
          <SearchBar onSearch={SearchRestaurants} />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="absolute top-full right-4 mt-2 bg-[#1f1f1f] rounded-lg shadow-lg p-4 flex flex-col items-start text-sm space-y-2 border border-[#B68D67]">
          <button onClick={()=> setActiveModal("login")}  className="w-full text-left text-[#A07E5D] hover:text-white">
            Login
          </button>
          <button onClick={()=> setActiveModal("register")} className="w-full text-left text-white hover:text-[#B68D67]">
            Register
          </button>
        </div>
      )}


      {/* Login Modal */}
      {activeModal === "login" && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <LoginModal onClose={() => setActiveModal(null)} />
        </Suspense>
      )}
      {/* Register Modal */}
      {activeModal === "register" && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <RegisterModal onClose={() => setActiveModal(null)} />
        </Suspense>
      )}
    </header>
  );
}

export default Header;