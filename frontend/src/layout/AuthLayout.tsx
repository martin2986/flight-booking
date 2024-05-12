import { FC } from 'react';
type AuthLayoutProps = {
  children: React.ReactNode;
  AUTH_TITLE: 'Log in to your account' | 'Create an account' | 'Verify Account';
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, AUTH_TITLE = '' }) => {
  return (
    <>
      <div className=" min-h-screen bg-transparent">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>

          <div className="mt-10 pb-10 mx-auto w-full sm:max-w-sm bg-white p-3 rounded-md shadow-md md:w-72">
            <h2 className=" my-7 text-center text-base  leading-9 tracking-tight text-gray-900">
              {AUTH_TITLE}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
