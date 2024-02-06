import { FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../components/NotFound';
import VerifyAccount from '../components/VerifyAccount';
import LoginForm from '../pages/Login';
import RegisterForm from '../pages/Register';
const Dashboard = lazy(() => import('../pages/Dashboard'));
type AuthRouterProps = {};

const AuthRouter: FC<AuthRouterProps> = () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route element={<Dashboard />} path="/schedules" />
      <Route element={<LoginForm />} path="/login" />
      <Route element={<RegisterForm />} path="/register" />
      <Route element={<VerifyAccount />} path="/verify" />
      <Route element={<Navigate to="/login" replace />} path="/logout" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRouter;
