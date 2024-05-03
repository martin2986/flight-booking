import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';
import PageLoader from '../components/UI/PageLoader';

import { useAppSelector } from '../redux/hooks';
import ProtectedRoute from './ProtectedRoute';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Schedules = lazy(() => import('../pages/Schedules'));
const Bookings = lazy(() => import('../pages/Bookings'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const UpdatePassword = lazy(() => import('../components/UpdatePassword'));
const LoginForm = lazy(() => import('../pages/Login'));
const CheckoutLayout = lazy(() => import('../layout/CheckoutLayout'));
const VerifyAccount = lazy(() => import('../components/VerifyAccount'));
const RegisterForm = lazy(() => import('../pages/Register'));

const AppRouter = () => {
  const { isLoading } = useAppSelector((state) => state.app);
  if (isLoading) return <PageLoader />;
  return (
    <Routes>
      <Route element={<LoginForm />} path="login" />
      <Route element={<RegisterForm />} path="register" />
      <Route element={<VerifyAccount />} path="verify" />
      <Route element={<Dashboard />} path="/" />
      <Route element={<Schedules />} path="schedule" />
      <Route element={<Bookings />} path="bookings" />
      <Route element={<CheckoutLayout />} path="checkout" />
      <Route element={<ProtectedRoute redirectPath="/" />}>
        <Route element={<UserProfile />} path="profile" />
        <Route element={<UpdatePassword />} path="edit-account" />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
