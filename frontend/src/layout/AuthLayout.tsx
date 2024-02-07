import React, { FC } from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  AUTH_TITLE: 'Sign In' | 'Sign Up' | 'Verify Account';
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, AUTH_TITLE = '' }) => {
  return (
    <div className=" min-h-screen bg-transparent">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {AUTH_TITLE}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
