import { useAppSelector } from '@/redux/hooks';
import PageLoader from '@/UI/PageLoader';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/index';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isLoading } = useAppSelector((state) => state.app);

  if (isLoading) return <PageLoader />;
  return (
    <div className={` ${isHomePage ? 'app' : ''}`}>
      <NavBar />
      <div className=" container mx-auto min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
