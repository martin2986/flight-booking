import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NotFound from '../components/NotFound';
import VerifyAccount from '../components/VerifyAccount';
import AppLayout from '../layout/AppLayout';
import LoginForm from '../pages/Login';
import RegisterForm from '../pages/Register';
import SelectedFlight from '../pages/SelectedFlight';
import ProtectedRoute from './ProtectedRoute';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Schedules = lazy(() => import('../pages/Schedules'));
const Bookings = lazy(() => import('../pages/Bookings'));
const NavBar = lazy(() => import('../components/NavBar'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const UpdatePassword = lazy(() => import('../components/UpdatePassword'));

const AppRouter = () => {
  return (
    <AppLayout>
      <NavBar />
      <Routes>
        <Route element={<LoginForm />} path="/login" />
        <Route element={<RegisterForm />} path="/register" />
        <Route element={<VerifyAccount />} path="/verify" />
        <Route element={<Dashboard />} path="/" />
        <Route element={<Schedules />} path="/schedules" />
        <Route element={<Bookings />} path="/bookings" />
        <Route element={<SelectedFlight />} path="/selectedFlight" />
        <Route element={<ProtectedRoute redirectPath="/" />}>
          <Route element={<UserProfile />} path="/profile" />
          <Route element={<UpdatePassword />} path="/edit-account" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AppLayout>
  );
};

export default AppRouter;
