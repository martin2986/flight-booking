import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { buttonVariants } from '../../UI/Button';
import SideBar from '../SideBar';
import UserIcon from '../../features/User/UserIcon';
const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const toggleOpenNavHandler = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={`bg-transparent mb-3 ${!isHomePage ? 'text-base-900' : 'text-base-light'} `}>
      <nav className="container mx-auto flex justify-between p-1 items-center ">
        <div className="text-xl lg:flex-1">
          <Link to="/" className="text-[20px]">
            FlyEasy
          </Link>
        </div>
        <div
          className="lg:hidden text-base-light cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <RxHamburgerMenu />
        </div>
        <div className="hidden justify-end items-center lg:flex lg:flex-1 gap-2 ">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="text-sm ">
                Register
              </Link>
              <Link to="/login" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                Sign in
              </Link>
            </>
          ) : (
            <UserIcon onClick={() => setIsOpen((prev) => !prev)} />
          )}
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && <SideBar setIsOpen={toggleOpenNavHandler} type="nav" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
