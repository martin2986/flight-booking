import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound';
import VerifyAccount from '../components/VerifyAccount';
import LoginForm from '../pages/Login';
import RegisterForm from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Schedules = lazy(() => import('../pages/Schedules'));
const Bookings = lazy(() => import('../pages/Bookings'));
const NavBar = lazy(() => import('../components/NavBar'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const UpdatePassword = lazy(() => import('../components/UpdatePassword'));

const AppRouter = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route element={<LoginForm />} path="/login" />
        <Route element={<RegisterForm />} path="/register" />
        <Route element={<VerifyAccount />} path="/verify" />
        <Route element={<Dashboard />} path="/" />
        <Route element={<Schedules />} path="/schedules" />
        <Route element={<Bookings />} path="/bookings" />
        <Route element={<ProtectedRoute redirectPath="/" />}>
          <Route element={<UserProfile />} path="/profile" />
          <Route element={<UpdatePassword />} path="/edit-account" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
