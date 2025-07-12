import { lazy ,Suspense , useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import SearchBar from '@components/common/SearchBar';
const LoginModal = lazy(() => import("@components/auth/LoginModal"));
const RegisterModal = lazy(()=> import("@components/auth/RegisterModal"))
import { logout } from '@services/AuthServices';


function Header(){
  const navigate = useNavigate();

  const isLoggedIn = (localStorage.getItem("accessToken"))? true : false; 
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
      <Link to = '/' className="flex justify-center items-center w-30 lg:w-35 lg:pl-2">
        <img src="/Sufrá.png" alt="Sufrá logo" />
      </Link>

      <div id='searchBar' className="lg:block w-full">
        <SearchBar onSearch={SearchRestaurants} />
      </div>

      {isLoggedIn ?
       <div id='logged_in' className='flex justify-center items-center space-x-3 lg:space-x-6 font-[Inter] font-medium text-[#B68D67] text-xs lg:text-lg'>
          <button 
            id='notification'
            className='size-[20px] lg:size-[30px] transform duration-200 hover:scale-110 hover:brightness-130'
            >
            <img src="/notification-bell.png" alt="" />
          </button>

          <Link 
            to={"/cart"}
            className='size-[20px] lg:size-7  transform duration-200 hover:scale-110 hover:brightness-130'
          >
            <img src="/shopping-bag (1).png" alt="" />
          </Link>

          <button 
            id='ProfilePage'
            onClick={handleLogout}
            className="size-[20px] lg:size-8 hover:ring-3 hover:ring-[#213a39] bg-amber-50 rounded-full overflow-hidden transform transition-transform duration-200 hover:scale-110"
          >
            {fname && lname ? `${fname[0]}${lname[0]}`.toUpperCase() : "?"}
          </button>    
        </div>
       :
        <div id='guest' className="flex space-x-2 lg:space-x-4 font-[caughe] text-xs lg:text-lg">
          <button onClick={() => setActiveModal("login")} className="rounded-4xl bg-transparent border text-[#A07E5D] border-[#B68D67] px-2 lg:px-4 py-1 lg:py-2  hover:bg-[#B68D67] hover:text-white transition">
            Login
          </button>
          <button onClick={() => setActiveModal("register")} className="rounded-4xl bg-[#B68D67] border border-[#B68D67] px-2 lg:px-4 py-1 lg:py-2 hover:bg-transparent transition">
            Register
          </button>
        </div>
      } 



      {activeModal === "login" && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <LoginModal onClose={() => setActiveModal(null)} onSwitch={()=> setActiveModal("register")} />
        </Suspense>
      )}

      {activeModal === "register" && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <RegisterModal onClose={() => setActiveModal(null)} onSwitch={()=> setActiveModal("login")} />
        </Suspense>
      )}
    </header>
  );
}

export default Header;