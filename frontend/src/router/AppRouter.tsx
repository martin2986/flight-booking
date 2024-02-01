import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
const NotFound = lazy(() => import('../components/NotFound'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
