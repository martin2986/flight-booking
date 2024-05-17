import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
type ProtectedRouteProps = {
  redirectPath: string;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = '/' }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
