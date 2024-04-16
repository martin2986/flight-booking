import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { buttonVariants } from '../Button';
import SideBar from '../SideBar';
import UserIcon from '../UserIcon';
import { mobileSide, navLinks, sideLinks } from './navUtil';
type NavProps = {};

const Index: FC<NavProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userNavIsOpen, setUserNavIsOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const location = useLocation();
  const isPageActive = location.pathname;
  return (
    <div className={`bg-transparent text-black `}>
      <nav className="container mx-auto flex justify-between p-1 items-center ">
        <div className="text-xl lg:flex-1">
          <Link to="/">Eazy jet</Link>
        </div>
        <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          <RxHamburgerMenu />
        </div>

        <ul className=" hidden  lg:flex flex-row lg:gap-x-8 text-sm">
          {navLinks.map(({ link, path }) => (
            <li key={link}>
              <Link to={path}>{link}</Link>
              {isPageActive === path && (
                <motion.div
                  layoutId="active-nav"
                  className="border-b-2 border-transparent border-b-black"
                />
              )}
            </li>
          ))}
        </ul>
        <div className="hidden justify-end lg:flex lg:flex-1 gap-2 ">
          {!isLoggedIn ? (
            <>
              <Link
                to="register"
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                style={{ color: 'black' }}
              >
                Register
              </Link>
              <Link to="login" className={buttonVariants({ size: 'sm' })}>
                Sign in
              </Link>
            </>
          ) : (
            <UserIcon onClick={() => setUserNavIsOpen((prev) => !prev)} />
          )}
        </div>
      </nav>
      {userNavIsOpen && <SideBar setIsOpen={setUserNavIsOpen} type="side" listItems={sideLinks} />}
      <AnimatePresence>
        {isOpen && (
          <SideBar
            setIsOpen={setIsOpen}
            type="nav"
            listItems={!isLoggedIn ? navLinks : mobileSide}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
