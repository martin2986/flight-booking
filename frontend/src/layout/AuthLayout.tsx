import { FC } from 'react';
type AuthLayoutProps = {
  children: React.ReactNode;
  AUTH_TITLE: 'Sign In' | 'Sign Up' | 'Verify Account';
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, AUTH_TITLE = '' }) => {
  return (
    <div className="w-full h-screen text-base-900">
      <div className="h-full flex items-center justify-center">
        <div className="w-72">
          <h2 className=" md:mb-10 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
            {AUTH_TITLE}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
