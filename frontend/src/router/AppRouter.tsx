import PageLoader from '@/UI/PageLoader';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const AppLayout = lazy(() => import('@/layout/AppLayout'));
const Flights = lazy(() => import('../pages/Flights'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const UpdatePassword = lazy(() => import('../features/User/UpdatePassword'));
const LoginForm = lazy(() => import('../pages/Login'));
const CheckoutLayout = lazy(() => import('../features/Checkout/CheckoutLayout'));
const VerifyAccount = lazy(() => import('../components/VerifyAccount'));
const RegisterForm = lazy(() => import('../pages/Register'));

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <AppLayout>
        <Routes>
          <Route element={<LoginForm />} path="login" />
          <Route element={<RegisterForm />} path="register" />
          <Route element={<VerifyAccount />} path="verify" />
          <Route element={<Dashboard />} path="/" />
          <Route element={<Flights />} path="flight-schedule" />
          <Route element={<CheckoutLayout />} path="checkout" />
          <Route
            path="/hotel-booking"
            Component={() => {
              window.location.href = 'https://www.booking.com';
              return null;
            }}
          />
          <Route
            path="/car-booking"
            Component={() => {
              window.location.href = 'https://www.booking.com/cars';
              return null;
            }}
          />
          <Route element={<ProtectedRoute redirectPath="/" />}>
            <Route element={<UserProfile />} path="profile" />
            <Route element={<UpdatePassword />} path="edit-account" />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Suspense>
  );
};

export default AppRouter;
