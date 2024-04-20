import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/index';
type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className={` ${isHomePage ? 'app' : ''}`}>
      <NavBar />
      <div className=" container mx-auto min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
