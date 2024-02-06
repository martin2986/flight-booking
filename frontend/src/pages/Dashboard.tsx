import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/actions';

import NavBar from '../components/NavBar';
type DashboardProps = {};

const Dashboard: FC<DashboardProps> = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <div>
      <NavBar />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
