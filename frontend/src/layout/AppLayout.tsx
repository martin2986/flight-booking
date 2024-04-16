import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className={` ${isHomePage ? 'app' : ''}`}>
      <div className=" container mx-auto ">{children}</div>
    </div>
  );
};

export default AppLayout;
