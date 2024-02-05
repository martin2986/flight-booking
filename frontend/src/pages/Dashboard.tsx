import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authRequest';
import NavBar from '../components/NavBar';
type DashboardProps = {};

const Dashboard: FC<DashboardProps> = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    // await dispatch(logout());
    const data = await logout();
    await dispatch(data);
    console.log(data);
  };

  return (
    <div>
      <NavBar />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
