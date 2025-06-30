import ManagerSideBar from 'Components/ManagerSideBar';
import { Outlet } from 'react-router-dom';

const ManagerLayout = () => {
  return (
    <div className="flex">
      <ManagerSideBar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;
