import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { buttonVariants } from '../../UI/Button';
import SideBar from '../SideBar';
import UserIcon from '../../features/User/UserIcon';

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userNavIsOpen, setUserNavIsOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const toggleUserNavHandler = () => {
    setUserNavIsOpen((prev) => !prev);
  };
  const toggleOpenNavHandler = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={`bg-transparent text-black `}>
      <nav className="container mx-auto flex justify-between p-1 items-center ">
        <div className="text-xl lg:flex-1">
          <Link to="/">Eazy jet</Link>
        </div>
        <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          <RxHamburgerMenu />
        </div>
        <div className="hidden justify-end lg:flex lg:flex-1 gap-2 ">
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                style={{ color: 'black' }}
              >
                Register
              </Link>
              <Link to="/login" className={buttonVariants({ size: 'sm' })}>
                Sign in
              </Link>
            </>
          ) : (
            <UserIcon onClick={() => setUserNavIsOpen((prev) => !prev)} />
          )}
        </div>
      </nav>
      {userNavIsOpen && <SideBar setIsOpen={toggleUserNavHandler} type="side" />}
      <AnimatePresence>
        {isOpen && <SideBar setIsOpen={toggleOpenNavHandler} type="nav" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
