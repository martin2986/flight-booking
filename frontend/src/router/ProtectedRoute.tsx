import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
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
