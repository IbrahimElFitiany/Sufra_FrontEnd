import { Link,useNavigate} from 'react-router-dom';
import { lazy ,Suspense , useState } from 'react';
import SearchBar from '@components/SearchBar';
import { Menu, Search } from 'lucide-react';
import { HashLoader } from 'react-spinners';
const LoginModal = lazy(() => import("@components/modals/LoginModal"));

// //for testing the fallback
// const LoginModal = lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(import("@components/modals/LoginModal"));
//     }, 2000);
//   });
// });

function Header() {

  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => setIsModalOpen(true);
  const SearchRestaurants = (query: string) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
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
      <div className="hidden lg:flex space-x-4 font-[caughe] text-xs lg:text-lg">
        <button onClick={OpenModal} className="rounded-4xl bg-transparent border text-[#A07E5D] border-[#B68D67] px-4 py-2 hover:bg-[#B68D67] hover:text-white transition">
          Login
        </button>
        <button className="rounded-4xl bg-[#B68D67] border border-[#B68D67] px-4 py-2 hover:bg-transparent transition">
          Register
        </button>
      </div>


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
          <button onClick={OpenModal}  className="w-full text-left text-[#A07E5D] hover:text-white">
            Login
          </button>
          <button onClick={OpenModal} className="w-full text-left text-white hover:text-[#B68D67]">
            Register
          </button>
        </div>
      )}
      {isModalOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 bg-[#000000af] flex items-center justify-center text-white">
            <HashLoader color="#B68D67" size={50} />
          </div>}>
          <LoginModal onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </header>
  );
}

export default Header;