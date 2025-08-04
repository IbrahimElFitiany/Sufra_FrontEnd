import { Link,useNavigate} from 'react-router-dom';

import SearchBar from '@components/common/SearchBar';
import UserNav from '@components/layout/Header/UserNav'
import AuthButtons from '@components/layout/Header/AuthButtons';

function Header(){
  const navigate = useNavigate();

  const isLoggedIn = (localStorage.getItem("accessToken"))? true : false; 

  const SearchRestaurants = (query:string, page:number) => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (page) params.append("page", String(1));
    navigate(`/search?${params.toString()}`);
  };



  return (
    <header className="relative w-full border-b-1 border-[#B68D67] px-6 py-4 text-white flex items-center justify-between">

      <Link id='sufra_logo' to = '/' className="flex justify-center items-center w-30 lg:w-35 lg:pl-2">
        <img src="/Sufrá.png" alt="Sufrá logo" />
      </Link>

      <div id='searchBar' className="lg:block w-full">
        <SearchBar onSearch={SearchRestaurants} placeholder='Search restaurants'/>
      </div>

      {isLoggedIn ? <UserNav/> : <AuthButtons/>} 
    </header>
  );
}

export default Header;