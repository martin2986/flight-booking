import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
const NotFound = lazy(() => import('../components/NotFound'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Schedules = lazy(() => import('../pages/Schedules'));
const Bookings = lazy(() => import('../pages/Bookings'));

const AppRouter = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route path="*" element={<NotFound />} />
        <Route element={<Schedules />} path="/schedules" />
        <Route element={<Bookings />} path="/bookings" />
      </Routes>
    </div>
  );
};

export default AppRouter;
