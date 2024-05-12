import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import PageLoader from '../UI/PageLoader';

import { useAppSelector } from '../redux/hooks';
import ProtectedRoute from './ProtectedRoute';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Flights = lazy(() => import('../pages/Flights'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const UpdatePassword = lazy(() => import('../features/User/UpdatePassword'));
const LoginForm = lazy(() => import('../pages/Login'));
const CheckoutLayout = lazy(() => import('../features/Checkout/CheckoutLayout'));
const VerifyAccount = lazy(() => import('../pages/VerifyAccount'));
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
      <Route element={<Flights />} path="flight-schedule" />
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
