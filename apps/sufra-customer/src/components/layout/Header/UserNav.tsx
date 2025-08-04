import { Link,useNavigate} from 'react-router-dom';
import UserDropdown from '@components/layout/Header/UserDropdown';
import { logout } from '@services/AuthServices';

function UserNav() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user"); 
  const { fname, lname } = user ? JSON.parse(user) : { fname: "", lname: "" };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div id='logged_in' className='flex justify-center pl-2 items-center space-x-3 lg:space-x-6 font-[Inter] font-medium text-[#B68D67] text-xs lg:text-lg'>
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
        <img src="/shopping-bag.png" alt="" />
      </Link>

      <UserDropdown fname={fname} lname={lname} handleLogout={handleLogout}/>
    </div>
  )
}

export default UserNav