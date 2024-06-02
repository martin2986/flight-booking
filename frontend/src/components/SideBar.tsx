import { motion } from 'framer-motion';
import { FC } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UserIcon from '../features/User/UserIcon';
import { logout } from '../redux/auth/AuthAction';
import { useAppSelector, useDisPatch } from '../redux/hooks';
import { buttonVariants } from '../UI/Button';
import { menuVar, sideLinks } from './NavBar/navUtil';
type SideBarProps = {
  setIsOpen: () => void;
  type: 'side' | 'nav';
};

const SideBar: FC<SideBarProps> = ({ setIsOpen, type }) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useDisPatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <motion.nav
      variants={menuVar}
      initial="initial"
      animate="animate"
      exit="exit"
      className={` fixed inset-y-0 z-50 right-0  w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10${type === 'nav' ? 'lg:hidden  ' : ''}`}
      role="dialog"
    >
      <div className="flex flex-row  items-center justify-between pb-3 border-b">
        <div className=" flex flex-row items-center justify-between ">
          {isLoggedIn ? (
            <UserIcon />
          ) : (
            <h3 className="text-base text-base-900 font-semibold leading-7 ">FlyEasy</h3>
          )}
          {isLoggedIn && (
            <Link to="/profile" onClick={setIsOpen} className=" cursor-pointer hover:text-gray-600">
              <h3>{user.name}</h3>
              <h3 className="text-sm hover:text-gray-600">{user.email}</h3>
            </Link>
          )}
        </div>
        <div className="text-base-900 cursor-pointer" onClick={setIsOpen}>
          <MdOutlineClose />
        </div>
      </div>

      {isLoggedIn && (
        <div className="space-y-2 ">
          {sideLinks.map(({ link, path }) => (
            <div key={link}>
              <Link
                className="-mx-3 px-3 block text-sm font-semibold leading-7 py-2  hover:bg-gray-100"
                to={path}
                onClick={setIsOpen}
              >
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6  ">
        {!isLoggedIn && (
          <div className="flex text-base-900 items-center gap-2 mt-3">
            <Link
              to="/register"
              onClick={setIsOpen}
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
              })}
            >
              Register
            </Link>
            <Link to="/login" onClick={setIsOpen} className={buttonVariants({ size: 'sm' })}>
              Sign in
            </Link>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div className=" -mx-3 px-3 block text-sm font-semibold py-2 leading-7 hover:bg-gray-100">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </motion.nav>
  );
};

export default SideBar;
