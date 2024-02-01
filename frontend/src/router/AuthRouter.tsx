import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../components/NotFound';
import VerifyAccount from '../components/VerifyAccount';
import LoginForm from '../pages/Login';
import RegisterForm from '../pages/Register';
type AuthRouterProps = {};

const AuthRouter: FC<AuthRouterProps> = () => {
  return (
    <Routes>
      <Route element={<RegisterForm />} path="/" />
      <Route element={<LoginForm />} path="/login" />
      <Route element={<VerifyAccount />} path="/verify" />
      <Route element={<Navigate to="/login" replace />} path="/logout" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRouter;
