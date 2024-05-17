import { FC } from 'react';
type AuthLayoutProps = {
  children: React.ReactNode;
  AUTH_TITLE: 'Sign In' | 'Sign Up' | 'Verify Account';
};

const AuthLayout: FC<AuthLayoutProps> = ({ children, AUTH_TITLE = '' }) => {
  return (
    <>
      <div className=" min-h-screen bg-transparent">
        <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-2">
          <div className="mt-5 pb-10 mx-auto w-full sm:max-w-sm bg-white p-3 rounded-md md:w-72">
            <h2 className=" my-5 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
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
