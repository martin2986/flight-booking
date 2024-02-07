import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import NavBar from '../components/NavBar';
type ProtectedRouteProps = {
  redirectPath: string;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = '/' }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to={redirectPath} />;
  }
};

export default ProtectedRoute;
