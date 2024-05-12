import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type UserLayoutProps = {
  children: ReactNode;
};

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-row mt-8">
        <div className="w-1/4 hidden md:block ">
          <div className="py-3 hover:bg-gray-400 px-3 -px-3">
            <Link to="/profile">Profile</Link>
          </div>
          <div className="py-3 hover:bg-gray-400 px-3 -px-3">
            <Link to="/edit-account">Account Security</Link>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default UserLayout;
